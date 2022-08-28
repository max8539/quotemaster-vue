# quotemaster-vue
A simple web app for sharing quotes!

This web app requires a connection to an instance of [mini-apis](https://github.com/max8539/mini-apis).

quotemaster-vue and its sister web app quotemaster-react \(coming soon\) were created as a way for me to start learning about frontend web development frameworks. 

quotemaster-vue was created with [Vue.js](https://vuejs.org), [Vue Router](https://router.vuejs.org), and built with [Vite](https://vitejs.dev).

## How to run
1. Start an instance of [mini-apis](https://github.com/max8539/mini-apis) by following the instructions on its repository, or have a link to an existing instance which you have permission to use.
2. Open `src/config.js` and change the following constants:
    - `HOST` should be the URL of this web app when it is running. This can be either a localhost (if using local preview) or a public web address (if deploying to the web).
    - `API-HOST` should be the URL of your running instance of mini-apis. 
3. Run `npm run build` to build your code, then either run `npm run preview` to run a local preview, or deploy the built code to a web server. 


---

Copyright © 2022 Max Yuen

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
