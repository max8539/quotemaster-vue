<script setup>
    import { reactive, ref, onMounted } from "vue";
    import { RouterView, useRoute, useRouter } from 'vue-router'
    import * as config from "./config.js";

    const host = ref(config.HOST);
    const apiOnline = ref(true);
    const route = useRoute();
    const routeDisplay = reactive(route);
    const router = useRouter();

    let handshake;

    async function doHandshake () {
        try {
            handshake = await fetch(`${config.API_HOST}/handshake`);
            if (!handshake.ok) {
                apiOnline.value = false;
            }
            apiOnline.value = true;
        } catch {
            apiOnline.value = false;
        }
    }
    
    onMounted(doHandshake);

    function goRandom () {
        if (route.fullPath == "/random") {
            router.go(0);
        } else {
            router.push("/random");
        }
    }
    function goPopular () {
        if (route.fullPath == "/popular") {
            router.go(0);
        } else {
            router.push("/popular");
        }
    }
    function goNew () {
        if (route.fullPath == "/new") {
            router.go(0);
        } else {
            router.push("/new");
        }
    }

</script>

<template>
    <div id="header">
        <h1>Quotemaster</h1>
        <p>Vue build v0.1.0</p>
    </div>
    <div id="no-api" v-if="!apiOnline">
        <p>Unable to reach API server.</p>
        <div class="button-container">
            <button @click="doHandshake">Retry</button>
        </div>
    </div>
    <div id="content" v-else>
        <div id="random" class="button-container">
            <button :disabled="this.$route.fullPath == '/random'" @click="this.$router.push('/random')">Random quote</button>
        </div>
        <div id="popular" class="button-container">
            <button :disabled="this.$route.fullPath == '/popular'" @click="this.$router.push('/popular')">Popular quote</button>
        </div>
        <div id="new" class="button-container">
            <button :disabled="this.$route.fullPath == '/new'" @click="this.$router.push('/new')">Write your own!</button>
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
        font-family: "Tahoma", sans-serif;
        font-weight: bold;
        font-size: 32px;
        text-align: center;
        line-height: 16px;
    }
    #header p {
        font-family: "Tahoma", sans-serif;
        text-align: center;
    }
    #no-api {
        width: 360px;
        margin: auto;
        padding: 10px;
        font-family: "Tahoma", sans-serif;
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
