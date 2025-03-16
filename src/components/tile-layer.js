/*
 * Copyright (c) 2023-25 Zendalona
 * This software is licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */

export let tileLayerPolitical = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    noWrap: true,
    tabindex: 0,
  }
);

export let tileLayerGeographical = L.tileLayer(
  'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,

    attribution:
      'Map data: &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a>',
    noWrap: true,
    tabindex: 0,
  }
);
