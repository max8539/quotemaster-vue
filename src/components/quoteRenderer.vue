<!--
    quotemaster-vue: src/components/quoteRenderer.vue
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
    import { ref, watch } from "vue";

    import * as config from "../config.js";

    const props = defineProps({
        quote: Object
    })

    let likeToggle = ref(false);
    let likeSuccess = ref(false);
    let shareToggle = ref(false);
    let shareLink = ref("");
    
    // Reset flag states if quote changes, update share link with new id
    function newQuoteState () {
        if (props.quote != null) {
            likeToggle.value = false;
            likeSuccess.value = false;
            shareToggle.value = false;
            shareLink.value = `${config.HOST}/id/${props.quote.id}`;
        }
    }

    // Send like API request
    async function likeQuote () {
        likeToggle.value = true;
        let reqObj = {id:props.quote.id}
        let res;

        try {
            res = await fetch(`${config.API_HOST}/quotemaster/like`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqObj),
            });

            if (res.ok) {
                likeSuccess.value = true;
            } else {
                likeToggle.value = false;
            }
        } catch {
            likeToggle.value = false;
        }
    }

    watch(() => props.quote, newQuoteState);
    
</script>

<template>
    <div id="placeholder" v-if="quote == null">
        <p>Loading quote...</p>
    </div>

    <div v-else>
        <p id="quote">{{quote.quote}}</p>
        <p id="name">- {{quote.name}}</p>

        <div id="actions">
            <div class="button-container">
                <button :disabled="likeToggle" @click="likeQuote">{{likeSuccess ? "Liked" : "Like"}} this quote</button>
            </div>

            <div class="button-container">
                <button :disabled="shareToggle" @click="shareToggle = true">Share this quote</button>
            </div>
        </div>

        <div id="share-link" v-if="shareToggle">
            <p>Copy this link to share:</p>
            <input type="text" :value="shareLink" disabled>
        </div>
    </div>
</template>

<style scoped>
    .button-container {
        text-align: center;
    }
    p {
        font-family: "Tahoma", sans-serif;
    }
    #placeholder p {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }
    #quote {
        text-align: justify;
        text-indent: 2em;
    }
    #name {
        text-align: right;
        font-style: italic;
    }
    #actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    #share-link {
        align-items: center;
    }
    #share-link p {
        margin-bottom: 0px;
    }
    #share-link input {
        width: 354px;
        padding:2px;
        border-width:1px;
        font-family: "Tahoma", sans-serif;
        font-size: 16px;
    }
</style>