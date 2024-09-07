import { createApp, defineComponent, onMounted, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

async function loadModule() {
  try {
    await import('/3d.js');
  } catch (error) {
    console.error('Error loading the module:', error);
  }
}

const QuizComponent = defineComponent({
  setup() {
    const currentQuestionIndex = ref(0);
    const instructionVisible = ref(false);
    const enteredValue = ref('');
    const numbers = ref('');
    const trueResult = "2785";
    const questions = [
      {
        question: "Внутри меня еда свежей остаётся, С холодом я храню, что быстро портится. С дверцей открывающейся часто, я на кухне помощник, Не для вещей, а для продуктов, что в доме есть.",
      },
      {
        question: "На свежем воздухе я часто пригожусь,Когда на балконе время проводишь, отдыхая. Небольшой и прочный, я стою под небом, Чтобы чашка кофе или книга лежали спокойно.",
      },
      {
        question: 'В ванной комнате я вишу над ванной, Внутри меня много красоты и ухаживающих средств. Когда утром или вечером ты готовишься к делу, Я всегда под рукой, чтобы помочь тебе выглядеть прекрасно.',
      },
      {
        question: "На кухне я вишу, и чашки вмещаю, С утра до вечера их на месте держу. Когда тебе нужна чашка для чая или кофе, Легко подойдёшь ко мне, и всё найдёшь."
      }
    ];

    const showPrize = () => {
      loadModule();
    };

    const tryAgain = () => {
      currentQuestionIndex.value = 0;
      enteredValue.value = '';
      numbers.value = '';
    }

    const onClick = () => {
      numbers.value += enteredValue.value;
      currentQuestionIndex.value++;
      enteredValue.value = '';

      if (currentQuestionIndex.value === questions.length && numbers.value === trueResult) {
        localStorage.setItem('quizCompleted', 1);
      }
    }

    const closeInstruction = () => {
      instructionVisible.value = false;
      localStorage.setItem('instructionCompleted', 1);
    };

    onMounted(() => {
      if (Boolean(localStorage.getItem('quizCompleted'))) {
        currentQuestionIndex.value = 4;
        numbers.value = trueResult;
      }

      console.log(Boolean(localStorage.getItem('instructionCompleted')));

      if (!Boolean(localStorage.getItem('instructionCompleted'))) {
        instructionVisible.value = true;
      }
    });

    return {
      questions,
      currentQuestionIndex,
      enteredValue,
      showPrize,
      numbers,
      trueResult,
      onClick,
      tryAgain,
      closeInstruction,
      instructionVisible
    };
  },
  template: `
    <div class="quiz">
      <template v-if="currentQuestionIndex <= questions.length - 1">
        <div v-if="instructionVisible" class="instruction">
          <div class="instruction-box">
            <h2>
              🎉 Поздравляю! Твой последний день окончен! </br>
              Твой подарок уже близко, но чтобы его получить, тебе нужно разгадать загадки и собрать цифры, которые сложатся в код. 
              Этот код укажет местоположение твоего сокровища! Выполни всё точно, и удача будет на твоей стороне! Удачи! 🎉
            </h2>
            <button @click="closeInstruction">Ок</button>
          </div>
        </div>
        <div class="questions">
          <h2>{{ questions[currentQuestionIndex].question }}</h2>
          <form @submit.prevent="onClick">
            <input key="currentQuestionIndex" type="text" maxlength="1" required placeholder="_" v-model="enteredValue" />
            <button>Next</button>
          </form>
        </div>
      </template>
      <template v-else>
        <template v-if="numbers === trueResult">
          <h2>🎉Congratulations!🎉</h2>
          <button @click="showPrize">Показать подарок</button>
        </template>
        <template v-else>
          <h2>👻Не верный код👻</h2>
          <button @click="tryAgain">Попробовать еще раз</button>
        </template>
      </template>
    </div>
  `
});

createApp(QuizComponent).mount('#app');