<template>
  <div class="app-main-wrapper">

     <main class="main intro">

        <p class="emoticon">O.o</p>
        <p class="intro-msg">This website is a collection of simply explained business  buzzwords and technical terms often used in workplace conversations that can leave most people puzzled.</p>

        <router-link tag="button"
                    :to="{ name: 'card' }"
                    class="cta">See an example</router-link>
     </main>

  </div>
</template>
