<template>
  <div class="qa">
    <div class="search-area">
      <ul class="container-qa">
        <li v-for="(item, index) in result" :key="index">
          <div class="question">
            <span>
              {{ item[0] }}
            </span>
          </div>
          <div class="answer">
            {{ item[1] }}
          </div>
        </li>
      </ul>
      <div v-show="isSearching" class="loading">
        <el-icon class="is-loading" size='2em' color='#409eff'>
          <Loading />
        </el-icon>
      </div>
      <div ref="scrollRef"></div>
    </div>
    <div class="welcom">
      <p v-show="isNew" class="user">{{ $t('qa.welcom1') }}<span>{{ authStore.user?.username }}</span> {{
        $t('qa.welcom2') }}</p>
      <!-- DeepSeek input area -->
      <div class="deepseek">
        <textarea :disabled="isSearching" v-model="question" :placeholder="$t('qa.placeholder')"
          @keydown.enter="handleKeydown" />
        <div class="deepseek-btn">
          <div class="left">
            <!-- <el-button @click="onSwitch('deepseek')" :type="btnActive.deepseek ? 'primary' : ''" round>
              {{ $t('qa.deepseek') }}
            </el-button> -->
            <!-- <el-button @click="onSwitch('search')" :type="btnActive.search ? 'primary' : ''" round>
              {{ $t('qa.onlineSearch') }}
            </el-button> -->
          </div>
          <div class="right">
            <!-- <el-button :icon="Paperclip" round @click="handleUpload" /> -->
            <!-- <el-button type="primary" :icon="isSearching ? VideoPause : VideoPlay" round @click="handleSubmit" /> -->
            <el-button type="primary" :icon="VideoPlay" round @click="handleSubmit" :disabled="isSearching" />

          </div>
        </div>

      </div>
    </div>
  </div>



</template>

<script setup>
import { onMounted, ref, reactive, nextTick } from 'vue'
import { useAuthStore } from '@/stores/auth'
import gsap from 'gsap'
import { Paperclip, VideoPlay, VideoPause, Loading } from '@element-plus/icons-vue'
import { getResult } from '@/api/qa.js'

const authStore = useAuthStore()
const btnActive = reactive({
  deepseek: false,
  search: false,
})
// Track whether this is a new conversation
const isNew = ref(true)
// Toggle button state
const onSwitch = (btn) => {
  btnActive[btn] = !btnActive[btn]
}
const question = ref('')
// Track whether a search is currently running
const isSearching = ref(false)
const scrollRef = ref(null)
const result = ref([
  // {
  //   question: 'What is this?',
  //   answer: 'This is the answer'
  // }
])
// Random delay between 3 and 10 seconds
const randomTime = () => {
  return Math.floor(Math.random() * (10 - 3 + 1)) + 3;
}
const onScrollToBottom = () => {
  nextTick(() => {
    scrollRef.value?.scrollIntoView({
      behavior: 'smooth', // Smooth scrolling
      block: 'center' // Vertically center the target
      // inline: 'center' // Optional: horizontally center the target
    })
  })
}
const timer = ref(null)
// Previous uuid
let lastUuid = ''
const handleSubmit = () => {
  isNew.value = false
  clearTimeout(timer.value)
  onScrollToBottom()
  // const date = new Date();
  // Cancel if a request is already in progress
  if (isSearching.value) {
    // isSearching.value = false
    // result.value.find(item => item.uuid === lastUuid).answer = `You clicked the stop button`
    // Flag for manual stop
    // onScrollToBottom()
    return
  }
  isSearching.value = true
  // lastUuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  // Invoke backend API
  const lastItem = [question.value]
  result.value.push(lastItem)
  onScrollToBottom()
  getResult(result.value).then(res => {
    console.log('res', res)
    result.value = res.result
    question.value = ''
    console.log('res.result', result.value)
    // result.value.find(item => item.uuid === lastUuid).answer = res.data.answer
  }).finally(() => {
    isSearching.value = false
    onScrollToBottom()
  })
  // Simulated search flow
  // timer.value = setTimeout(() => {
  //   clearTimeout(timer.value)
  //   if (!isSearching.value) {
  //     return
  //   }
  //   isSearching.value = false
  //   result.value.find(item => item.uuid === lastUuid).answer = `${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${question.value}`
  //   onScrollToBottom()
  // }, randomTime() * 1000)

}
// Handle keyboard events
const handleKeydown = (event) => {
  // Detect whether the Shift key was pressed
  if (event.shiftKey) {
    // When Shift+Enter is used we keep the default newline behavior
    // event.preventDefault(); // Uncomment to disable Shift+Enter newlines
    return; // Skip submit logic
  }

  // Submit when Enter is pressed without Shift
  handleSubmit();
  // Prevent the default newline triggered by Enter
  event.preventDefault();
};


// Upload a file
const handleUpload = () => {
  // Create an input element for attachments
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = (e) => {
    const file = e.target.files[0]
    console.log('file', file)
  }
  input.click()
  input.remove()
}

onMounted(() => {
  gsap.fromTo(
    '.user',
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 1 }
  )
})
</script>


<style lang="scss" scoped>
.qa {
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .search-area {
    flex: 1 1 auto;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;

    .container-qa {
      display: flex;
      flex-direction: column;
      gap: 48px;
      overflow-wrap: break-word;
      /* Prefer breaking inside words for better readability */
      word-break: break-all;
      /* Force wrapping at container boundaries for edge cases */
      white-space: normal;

      /* Allow automatic wrapping to avoid overrides */
      .question {
        display: flex;
        justify-content: flex-end;

        span {
          display: flex;
          font-size: 16px;
          border-radius: 8px;
          padding: 8px 16px;
          box-sizing: border-box;
          background: #f5f5f5;

        }
      }

      .answer {
        margin-top: 24px;
      }
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;

    }
  }

  .welcom {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    color: var(--text-primary);

    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    display: flex;

    >p {
      span {
        color: #f56c6c;
      }
    }
  }

  .deepseek {
    width: 80%;
    padding: 4px 4px 12px 4px;
    border: 1px solid var(--border-primary);
    border-radius: 20px;
    transition: var(--el-transition-box-shadow);
    transform: translateZ(0);
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;

    textarea {
      width: 100%;
      height: 4rem;
      padding: 0.875rem;
      font-size: 16px;
      color: var(--el-input-text-color);
      border: none;
      outline: none;
      box-sizing: border-box;
      resize: none;
    }

    .deepseek-btn {
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        gap: 8px;
      }

      .right {
        display: flex;
        gap: 8px;
      }
    }
  }
}
</style>
