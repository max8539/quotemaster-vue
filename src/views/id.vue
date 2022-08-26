<!--
    quotemaster-vue
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
    import { useRoute } from "vue-router";

    import * as config from "../config.js";
    import quoteRenderer from "../components/quoteRenderer.vue";

    const ROUTE = useRoute();
    const ID = ROUTE.params.id;
    const QUOTE = ref(null);
    let error = ref(false);
    let errorMessage = ref("Unable to load quote.");


    async function getQuote () {
        let res, errorObj;
        try {
            res = await fetch(`${config.API_HOST}/quotemaster/id/${ID}`);
            if (!res.ok) {
                error.value = true;
                if (res.status == 400) {
                    errorObj = await res.json();
                    errorMessage.value = errorObj.errorMessage;
                }
            } else {
                QUOTE.value = await res.json();
            }
        } catch {
            error.value = true;
        }
    }

    onMounted(getQuote);
</script>

<template>
    <div id="error-layover" v-if="error">
        <p>{{errorMessage}}</p>
        <div class="button-container">
            <button @click="getQuote">Retry</button>
        </div>
    </div>
    <div id="quote-display" v-else>
        <quoteRenderer :quote="QUOTE" />
    </div>
</template>

<style scoped>
    p {
        font-family: "Tahoma", sans-serif;
        font-size: 24px;
        font-weight: bold;
        padding: 10px;
        text-align: center;
    }
    .button-container {
        text-align: center;
    }
    #error-layover {
        background-color: #ffaaaa;
        margin: auto;
        padding:10px;
    }
</style>