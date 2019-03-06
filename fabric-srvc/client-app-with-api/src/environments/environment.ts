/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // REST_SERVER_URL: 'http://localhost:3001',
  // COMPOSER_REST_SERVER_HOST: 'localhost',
  REST_SERVER_URL: 'http://35.178.220.40:3001',
  COMPOSER_REST_SERVER_HOST: '35.178.220.40',
  COMPOSER_REST_SERVER_PORT: '3000',
  SRC_ACCOUNT_ID: 101,
  TRG_ACCOUNT_ID: 102
};
