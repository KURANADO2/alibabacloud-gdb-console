/*
 * MIT License
 *
 * Copyright (c) 2022 Alibaba Cloud
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const configKey = "graphEyeConfigV2";
const displayNameDefaultsVersion = 1;

export default class SettingsStorage {
  load() {
    const data = localStorage.getItem(configKey);
    if (data) {
      const settings = JSON.parse(data);
      settings.system = settings.system || {};
      settings.node = settings.node || {};
      settings.edge = settings.edge || {};

      if (settings.system.displayNameDefaultsVersion !== displayNameDefaultsVersion) {
        Object.values(settings.node).forEach((nodeSettings) => {
          if (nodeSettings.text === "id") {
            nodeSettings.text = "property";
            nodeSettings.textValue = "name";
          }
        });
        Object.values(settings.edge).forEach((edgeSettings) => {
          if (edgeSettings.text === undefined || edgeSettings.text === "label") {
            edgeSettings.text = "property";
            edgeSettings.textValue = "name";
          }
        });
        settings.system.displayNameDefaultsVersion = displayNameDefaultsVersion;
        this.save(settings);
      }

      return settings;
    }
    return {
      system: { displayNameDefaultsVersion },
      node: {},
      edge: {},
    };
  }

  save(settings) {
    localStorage.setItem(configKey, JSON.stringify(settings));
  }
}
