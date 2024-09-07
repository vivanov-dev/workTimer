import{defineComponent as l,ref as t,createApp as u}from"https://unpkg.com/vue@3/dist/vue.esm-browser.js";const r=l({setup(){const e=t(0),s=[{question:"Любимый цвет мужа?",options:["Темно-синий","Белый","Желтый"],answer:"Темно-синий"},{question:"Сколько лет Чипу?",options:["2","4","6"],answer:"6"},{question:'Какой элемент обозначается символом "O"?',options:["Золото","Кислород","Серебро"],answer:"Кислород"}],n=t(null),o=t(!1),i=t(!1);return{questions:s,currentQuestionIndex:e,selectedOption:n,isCorrect:o,isIncorrect:i,checkAnswer:()=>{n.value===s[e.value].answer?o.value=!0:i.value=!0,setTimeout(()=>{n.value=null,o.value=!1,i.value=!1,e.value<s.length-1&&e.value++},2e3)}}},template:`
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
  `});u(r).mount("#app");
