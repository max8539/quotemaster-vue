<!--
    quotemaster-vue: src/App.vue
    https://github.com/max8539/quotemaster-vue
    
    Copyright (C) 2022 Max Yuen

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 -->
<script setup>
    import { ref, onMounted } from "vue";
    import { RouterView, useRoute, useRouter } from 'vue-router';
    import * as config from "./config.js";

    const apiOnline = ref(true);
    const route = useRoute();
    const router = useRouter();

    // Test API connectivity
    async function doHandshake () {
        let handshake;
        try {
            handshake = await fetch(`${config.API_HOST}/handshake`);
            if (handshake.ok) {
                apiOnline.value = true;
            } else {
                apiOnline.value = false;
            }
        } catch {
            apiOnline.value = false;
        }
    }
    
    onMounted(doHandshake);

    // Check if currently on a page
    function isRandom () {
        return route.fullPath == "/random";
    }
    function isPopular () {
        return route.fullPath == "/popular";
    }
    function isNew () {
        return route.fullPath == "/new";
    }

    // Update router to go to page
    function goRandom () {
        router.push("/random");
    }
    function goPopular () {
        router.push("/popular");
    }
    function goNew () {
        router.push("/new");
    }

</script>

<template>
    <div id="header">
        <h1>Quotemaster</h1>
        <p>Vue build v0.1.0</p>
        <p><a href="https://github.com/max8539/quotemaster-vue">View code on GitHub</a></p>
    </div>
    
    <div id="no-api" v-if="!apiOnline">
        <p>Unable to reach API server.</p>
        <div class="button-container">
            <button @click="doHandshake()">Retry</button>
        </div>
    </div>

    <div id="content" v-else>
        <div id="random" class="button-container">
            <button :disabled="isRandom()" @click="goRandom()">Random quote</button>
        </div>
        <div id="popular" class="button-container">
            <button :disabled="isPopular()" @click="goPopular()">Popular quote</button>
        </div>
        <div id="new" class="button-container">
            <button :disabled="isNew()" @click="goNew()">Write your own</button>
        </div>
        
        <div id="router">
            <RouterView />
        </div>
    </div>

    

</template>

<style scoped>
    .button-container {
        text-align: center;
    }
    #header h1 {
        font-weight: bold;
        font-size: 32px;
        text-align: center;
        line-height: 16px;
    }
    #header p {
        text-align: center;
    }
    #no-api {
        width: 340px;
        margin: auto;
        padding: 10px;
        text-align: center;
        background-color: #ffaaaa;
    }
    #content {
        width: 360px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-areas: 
        "random popular new"
        "router router router";
    }
    #random {
        grid-area: random;
    }
    #popular {
        grid-area: popular;
    }
    #new {
        grid-area: new;
    }
    #router {
        grid-area: router;
        width:360px;
        margin: auto;
        padding-top:10px;
    }
    button {
        margin: auto;
    }

</style>
