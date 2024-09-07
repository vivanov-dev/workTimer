import{_ as m}from"./index-SXamTap5.js";import{defineComponent as d,ref as n,onMounted as v,createApp as p}from"https://unpkg.com/vue@3/dist/vue.esm-browser.js";async function g(){try{await m(()=>import("./3d-3DaJrqfh.js"),[])}catch(e){console.error("Error loading the module:",e)}}const h=d({setup(){const e=n(0),l=n(!1),o=n(""),t=n(""),i="2785",u=[{question:"Внутри меня еда свежей остаётся, С холодом я храню, что быстро портится. С дверцей открывающейся часто, я на кухне помощник, Не для вещей, а для продуктов, что в доме есть."},{question:"На свежем воздухе я часто пригожусь,Когда на балконе время проводишь, отдыхая. Небольшой и прочный, я стою под небом, Чтобы чашка кофе или книга лежали спокойно."},{question:"В ванной комнате я вишу над ванной, Внутри меня много красоты и ухаживающих средств. Когда утром или вечером ты готовишься к делу, Я всегда под рукой, чтобы помочь тебе выглядеть прекрасно."},{question:"На кухне я вишу, и чашки вмещаю, С утра до вечера их на месте держу. Когда тебе нужна чашка для чая или кофе, Легко подойдёшь ко мне, и всё найдёшь."}],s=()=>{g()},r=()=>{e.value=0,o.value="",t.value=""},a=()=>{t.value+=o.value,e.value++,o.value="",e.value===u.length&&t.value===i&&localStorage.setItem("quizCompleted",1)},c=()=>{l.value=!1,localStorage.setItem("instructionCompleted",1)};return v(()=>{localStorage.getItem("quizCompleted")&&(e.value=4,t.value=i),console.log(!!localStorage.getItem("instructionCompleted")),localStorage.getItem("instructionCompleted")||(l.value=!0)}),{questions:u,currentQuestionIndex:e,enteredValue:o,showPrize:s,numbers:t,trueResult:i,onClick:a,tryAgain:r,closeInstruction:c,instructionVisible:l}},template:`
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
  `});p(h).mount("#app");
