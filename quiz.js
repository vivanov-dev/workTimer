import { createApp, defineComponent, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const QuizComponent = defineComponent({
  setup() {
    const currentQuestionIndex = ref(0);
    const questions = [
      {
        question: 'Любимый цвет мужа?',
        options: ['Темно-синий', 'Белый', 'Желтый'],
        answer: 'Темно-синий'
      },
      {
        question: 'Сколько лет Чипу?',
        options: ['2', '4', '6'],
        answer: '6'
      },
      {
        question: 'Какой элемент обозначается символом "O"?',
        options: ['Золото', 'Кислород', 'Серебро'],
        answer: 'Кислород'
      }
    ];

    const selectedOption = ref(null);
    const isCorrect = ref(false);
    const isIncorrect = ref(false);
    
    const checkAnswer = () => {
      if (selectedOption.value === questions[currentQuestionIndex.value].answer) {
        isCorrect.value = true;
      } else {
        isIncorrect.value = true;
      }

      setTimeout(() => {
        selectedOption.value = null;
        isCorrect.value = false;
        isIncorrect.value = false;
        if (currentQuestionIndex.value < questions.length - 1) {
          currentQuestionIndex.value++;
        }
      }, 2000);
    };

    return {
      questions,
      currentQuestionIndex,
      selectedOption,
      isCorrect,
      isIncorrect,
      checkAnswer
    };
  },
  template: `
    <div class="quiz">
      <template v-if="currentQuestionIndex < questions.length - 1">
        <div class="result-box" v-show="isCorrect">✅</div>
        <div class="result-box" v-show="isIncorrect">❌</div>
        <div class="questions">
          <h2>{{ questions[currentQuestionIndex].question }}</h2>
          <div class="questions-list">
            <label v-for="option in questions[currentQuestionIndex].options" :key="option">
                <input
                    type="radio" 
                    :value="option" 
                    v-model="selectedOption"  
                >
                {{ option }}
            </label>                
          </div>
          <button @click="checkAnswer">Check</button>
        </div>
      </template>
      <template v-else>
        <h2>🎉Congratulations!🎉</h2>
      </template>
    </div>
  `
});

createApp(QuizComponent).mount('#app');