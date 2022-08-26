// quotemaster-vue
// https://github.com/max8539/quotemaster-vue
//
// Copyright (C) 2022 Max Yuen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import { createRouter, createWebHistory } from 'vue-router'

import index from "../views/index.vue";
import random from "../views/random.vue";
import popular from "../views/popular.vue";
import new_ from "../views/new.vue";
import id_ from "../views/id.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: "/random",
      component: random
    },
    {
      path: "/popular",
      component: popular
    },
    {
      path: "/new",
      component: new_
    },
    {
      path: "/id/:id",
      component: id_ 
    }
  ]
})

export default router
