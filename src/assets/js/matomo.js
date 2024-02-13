/*!!
 * Matomo - free/libre analytics platform
 *
 * JavaScript tracking client
 *
 * @link https://piwik.org
 * @source https://github.com/matomo-org/matomo/blob/master/js/piwik.js
 * @license https://piwik.org/free-software/bsd/ BSD-3 Clause (also in js/LICENSE.txt)
 * @license magnet:?xt=urn:btih:c80d50af7d3db9be66a4d0a86db0286e4fd33292&dn=bsd-3-clause.txt BSD-3-Clause
 */
if (typeof _paq !== 'object') {
  _paq = [];
}
if (typeof window.Matomo !== 'object') {
  window.Matomo = window.Piwik = (function () {
    var s,
      b = {},
      A = {},
      K = document,
      g = navigator,
      ac = screen,
      X = window,
      h =
        X.performance ||
        X.mozPerformance ||
        X.msPerformance ||
        X.webkitPerformance,
      u = X.encodeURIComponent,
      W = X.decodeURIComponent,
      k = unescape,
      M = [],
      I,
      v,
      am = [],
      z = 0,
      ag = 0,
      Y = 0,
      m = false,
      q = '';
    function p(au) {
      try {
        return W(au);
      } catch (av) {
        return unescape(au);
      }
    }
    function N(av) {
      var au = typeof av;
      return au !== 'undefined';
    }
    function D(au) {
      return typeof au === 'function';
    }
    function aa(au) {
      return typeof au === 'object';
    }
    function y(au) {
      return typeof au === 'string' || au instanceof String;
    }
    function al(au) {
      return typeof au === 'number' || au instanceof Number;
    }
    function ad(au) {
      return N(au) && (al(au) || (y(au) && au.length));
    }
    function E(av) {
      if (!av) {
        return true;
      }
      var au;
      for (au in av) {
        if (Object.prototype.hasOwnProperty.call(av, au)) {
          return false;
        }
      }
      return true;
    }
    function ap(au) {
      var av = typeof console;
      if (av !== 'undefined' && console && console.error) {
        console.error(au);
      }
    }
    function ak() {
      var az, ay, aB, av, au;
      for (az = 0; az < arguments.length; az += 1) {
        au = null;
        if (arguments[az] && arguments[az].slice) {
          au = arguments[az].slice();
        }
        av = arguments[az];
        aB = av.shift();
        var aA, aw;
        var ax = y(aB) && aB.indexOf('::') > 0;
        if (ax) {
          aA = aB.split('::');
          aw = aA[0];
          aB = aA[1];
          if ('object' === typeof v[aw] && 'function' === typeof v[aw][aB]) {
            v[aw][aB].apply(v[aw], av);
          } else {
            if (au) {
              am.push(au);
            }
          }
        } else {
          for (ay = 0; ay < M.length; ay++) {
            if (y(aB)) {
              aw = M[ay];
              var aC = aB.indexOf('.') > 0;
              if (aC) {
                aA = aB.split('.');
                if (aw && 'object' === typeof aw[aA[0]]) {
                  aw = aw[aA[0]];
                  aB = aA[1];
                } else {
                  if (au) {
                    am.push(au);
                    break;
                  }
                }
              }
              if (aw[aB]) {
                aw[aB].apply(aw, av);
              } else {
                var aD =
                  "The method '" +
                  aB +
                  '\' was not found in "_paq" variable.  Please have a look at the Matomo tracker documentation: https://developer.matomo.org/api-reference/tracking-javascript';
                ap(aD);
                if (!aC) {
                  throw new TypeError(aD);
                }
              }
              if (aB === 'addTracker') {
                break;
              }
              if (aB === 'setTrackerUrl' || aB === 'setSiteId') {
                break;
              }
            } else {
              aB.apply(M[ay], av);
            }
          }
        }
      }
    }
    function at(ax, aw, av, au) {
      if (ax.addEventListener) {
        ax.addEventListener(aw, av, au);
        return true;
      }
      if (ax.attachEvent) {
        return ax.attachEvent('on' + aw, av);
      }
      ax['on' + aw] = av;
    }
    function n(au) {
      if (K.readyState === 'complete') {
        au();
      } else {
        if (X.addEventListener) {
          X.addEventListener('load', au, false);
        } else {
          if (X.attachEvent) {
            X.attachEvent('onload', au);
          }
        }
      }
    }
    function r(ax) {
      var au = false;
      if (K.attachEvent) {
        au = K.readyState === 'complete';
      } else {
        au = K.readyState !== 'loading';
      }
      if (au) {
        ax();
        return;
      }
      var aw;
      if (K.addEventListener) {
        at(K, 'DOMContentLoaded', function av() {
          K.removeEventListener('DOMContentLoaded', av, false);
          if (!au) {
            au = true;
            ax();
          }
        });
      } else {
        if (K.attachEvent) {
          K.attachEvent('onreadystatechange', function av() {
            if (K.readyState === 'complete') {
              K.detachEvent('onreadystatechange', av);
              if (!au) {
                au = true;
                ax();
              }
            }
          });
          if (K.documentElement.doScroll && X === X.top) {
            (function av() {
              if (!au) {
                try {
                  K.documentElement.doScroll('left');
                } catch (ay) {
                  setTimeout(av, 0);
                  return;
                }
                au = true;
                ax();
              }
            })();
          }
        }
      }
      at(
        X,
        'load',
        function () {
          if (!au) {
            au = true;
            ax();
          }
        },
        false
      );
    }
    function ah(av, aA, aB) {
      if (!av) {
        return '';
      }
      var au = '',
        ax,
        aw,
        ay,
        az;
      for (ax in b) {
        if (Object.prototype.hasOwnProperty.call(b, ax)) {
          az = b[ax] && 'function' === typeof b[ax][av];
          if (az) {
            aw = b[ax][av];
            ay = aw(aA || {}, aB);
            if (ay) {
              au += ay;
            }
          }
        }
      }
      return au;
    }
    function an(av) {
      var au;
      m = true;
      ah('unload');
      au = new Date();
      var aw = au.getTimeAlias();
      if (s - aw > 3000) {
        s = aw + 3000;
      }
      if (s) {
        do {
          au = new Date();
        } while (au.getTimeAlias() < s);
      }
    }
    function o(aw, av) {
      var au = K.createElement('script');
      au.type = 'text/javascript';
      au.src = aw;
      if (au.readyState) {
        au.onreadystatechange = function () {
          var ax = this.readyState;
          if (ax === 'loaded' || ax === 'complete') {
            au.onreadystatechange = null;
            av();
          }
        };
      } else {
        au.onload = av;
      }
      K.getElementsByTagName('head')[0].appendChild(au);
    }
    function O() {
      var au = '';
      try {
        au = X.top.document.referrer;
      } catch (aw) {
        if (X.parent) {
          try {
            au = X.parent.document.referrer;
          } catch (av) {
            au = '';
          }
        }
      }
      if (au === '') {
        au = K.referrer;
      }
      return au;
    }
    function t(au) {
      var aw = new RegExp('^([a-z]+):'),
        av = aw.exec(au);
      return av ? av[1] : null;
    }
    function d(au) {
      var aw = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)'),
        av = aw.exec(au);
      return av ? av[1] : au;
    }
    function H(au) {
      return /^[0-9][0-9]*(\.[0-9]+)?$/.test(au);
    }
    function R(aw, ax) {
      var au = {},
        av;
      for (av in aw) {
        if (aw.hasOwnProperty(av) && ax(aw[av])) {
          au[av] = aw[av];
        }
      }
      return au;
    }
    function C(aw) {
      var au = {},
        av;
      for (av in aw) {
        if (aw.hasOwnProperty(av)) {
          if (H(aw[av])) {
            au[av] = Math.round(aw[av]);
          } else {
            throw new Error(
              'Parameter "' +
                av +
                '" provided value "' +
                aw[av] +
                '" is not valid. Please provide a numeric value.'
            );
          }
        }
      }
      return au;
    }
    function l(av) {
      var aw = '',
        au;
      for (au in av) {
        if (av.hasOwnProperty(au)) {
          aw += '&' + u(au) + '=' + u(av[au]);
        }
      }
      return aw;
    }
    function ao(av, au) {
      av = String(av);
      return av.lastIndexOf(au, 0) === 0;
    }
    function V(av, au) {
      av = String(av);
      return av.indexOf(au, av.length - au.length) !== -1;
    }
    function B(av, au) {
      av = String(av);
      return av.indexOf(au) !== -1;
    }
    function f(av, au) {
      av = String(av);
      return av.substr(0, av.length - au);
    }
    function J(ax, aw, az) {
      ax = String(ax);
      if (!az) {
        az = '';
      }
      var au = ax.indexOf('#');
      var aA = ax.length;
      if (au === -1) {
        au = aA;
      }
      var ay = ax.substr(0, au);
      var av = ax.substr(au, aA - au);
      if (ay.indexOf('?') === -1) {
        ay += '?';
      } else {
        if (!V(ay, '?')) {
          ay += '&';
        }
      }
      return ay + u(aw) + '=' + u(az) + av;
    }
    function j(av, aw) {
      av = String(av);
      if (
        av.indexOf('?' + aw + '=') === -1 &&
        av.indexOf('&' + aw + '=') === -1
      ) {
        return av;
      }
      var ax = av.indexOf('?');
      if (ax === -1) {
        return av;
      }
      var au = av.substr(ax + 1);
      var aB = av.substr(0, ax);
      if (au) {
        var aC = '';
        var aE = au.indexOf('#');
        if (aE !== -1) {
          aC = au.substr(aE + 1);
          au = au.substr(0, aE);
        }
        var ay;
        var aA = au.split('&');
        var az = aA.length - 1;
        for (az; az >= 0; az--) {
          ay = aA[az].split('=')[0];
          if (ay === aw) {
            aA.splice(az, 1);
          }
        }
        var aD = aA.join('&');
        if (aD) {
          aB = aB + '?' + aD;
        }
        if (aC) {
          aB += '#' + aC;
        }
      }
      return aB;
    }
    function e(aw, av) {
      var au = '[\\?&#]' + av + '=([^&#]*)';
      var ay = new RegExp(au);
      var ax = ay.exec(aw);
      return ax ? p(ax[1]) : '';
    }
    function a(au) {
      if (au && String(au) === au) {
        return au.replace(/^\s+|\s+$/g, '');
      }
      return au;
    }
    function G(au) {
      return unescape(u(au));
    }
    function ar(aJ) {
      var aw = function (aP, aO) {
          return (aP << aO) | (aP >>> (32 - aO));
        },
        aK = function (aR) {
          var aP = '',
            aQ,
            aO;
          for (aQ = 7; aQ >= 0; aQ--) {
            aO = (aR >>> (aQ * 4)) & 15;
            aP += aO.toString(16);
          }
          return aP;
        },
        az,
        aM,
        aL,
        av = [],
        aD = 1732584193,
        aB = 4023233417,
        aA = 2562383102,
        ay = 271733878,
        ax = 3285377520,
        aI,
        aH,
        aG,
        aF,
        aE,
        aN,
        au,
        aC = [];
      aJ = G(aJ);
      au = aJ.length;
      for (aM = 0; aM < au - 3; aM += 4) {
        aL =
          (aJ.charCodeAt(aM) << 24) |
          (aJ.charCodeAt(aM + 1) << 16) |
          (aJ.charCodeAt(aM + 2) << 8) |
          aJ.charCodeAt(aM + 3);
        aC.push(aL);
      }
      switch (au & 3) {
        case 0:
          aM = 2147483648;
          break;
        case 1:
          aM = (aJ.charCodeAt(au - 1) << 24) | 8388608;
          break;
        case 2:
          aM =
            (aJ.charCodeAt(au - 2) << 24) |
            (aJ.charCodeAt(au - 1) << 16) |
            32768;
          break;
        case 3:
          aM =
            (aJ.charCodeAt(au - 3) << 24) |
            (aJ.charCodeAt(au - 2) << 16) |
            (aJ.charCodeAt(au - 1) << 8) |
            128;
          break;
      }
      aC.push(aM);
      while ((aC.length & 15) !== 14) {
        aC.push(0);
      }
      aC.push(au >>> 29);
      aC.push((au << 3) & 4294967295);
      for (az = 0; az < aC.length; az += 16) {
        for (aM = 0; aM < 16; aM++) {
          av[aM] = aC[az + aM];
        }
        for (aM = 16; aM <= 79; aM++) {
          av[aM] = aw(av[aM - 3] ^ av[aM - 8] ^ av[aM - 14] ^ av[aM - 16], 1);
        }
        aI = aD;
        aH = aB;
        aG = aA;
        aF = ay;
        aE = ax;
        for (aM = 0; aM <= 19; aM++) {
          aN =
            (aw(aI, 5) + ((aH & aG) | (~aH & aF)) + aE + av[aM] + 1518500249) &
            4294967295;
          aE = aF;
          aF = aG;
          aG = aw(aH, 30);
          aH = aI;
          aI = aN;
        }
        for (aM = 20; aM <= 39; aM++) {
          aN =
            (aw(aI, 5) + (aH ^ aG ^ aF) + aE + av[aM] + 1859775393) &
            4294967295;
          aE = aF;
          aF = aG;
          aG = aw(aH, 30);
          aH = aI;
          aI = aN;
        }
        for (aM = 40; aM <= 59; aM++) {
          aN =
            (aw(aI, 5) +
              ((aH & aG) | (aH & aF) | (aG & aF)) +
              aE +
              av[aM] +
              2400959708) &
            4294967295;
          aE = aF;
          aF = aG;
          aG = aw(aH, 30);
          aH = aI;
          aI = aN;
        }
        for (aM = 60; aM <= 79; aM++) {
          aN =
            (aw(aI, 5) + (aH ^ aG ^ aF) + aE + av[aM] + 3395469782) &
            4294967295;
          aE = aF;
          aF = aG;
          aG = aw(aH, 30);
          aH = aI;
          aI = aN;
        }
        aD = (aD + aI) & 4294967295;
        aB = (aB + aH) & 4294967295;
        aA = (aA + aG) & 4294967295;
        ay = (ay + aF) & 4294967295;
        ax = (ax + aE) & 4294967295;
      }
      aN = aK(aD) + aK(aB) + aK(aA) + aK(ay) + aK(ax);
      return aN.toLowerCase();
    }
    function af(aw, au, av) {
      if (!aw) {
        aw = '';
      }
      if (!au) {
        au = '';
      }
      if (aw === 'translate.googleusercontent.com') {
        if (av === '') {
          av = au;
        }
        au = e(au, 'u');
        aw = d(au);
      } else {
        if (
          aw === 'cc.bingj.com' ||
          aw === 'webcache.googleusercontent.com' ||
          aw.slice(0, 5) === '74.6.'
        ) {
          au = K.links[0].href;
          aw = d(au);
        }
      }
      return [aw, au, av];
    }
    function P(av) {
      var au = av.length;
      if (av.charAt(--au) === '.') {
        av = av.slice(0, au);
      }
      if (av.slice(0, 2) === '*.') {
        av = av.slice(1);
      }
      if (av.indexOf('/') !== -1) {
        av = av.substr(0, av.indexOf('/'));
      }
      return av;
    }
    function aq(av) {
      av = av && av.text ? av.text : av;
      if (!y(av)) {
        var au = K.getElementsByTagName('title');
        if (au && N(au[0])) {
          av = au[0].text;
        }
      }
      return av;
    }
    function T(au) {
      if (!au) {
        return [];
      }
      if (!N(au.children) && N(au.childNodes)) {
        return au.children;
      }
      if (N(au.children)) {
        return au.children;
      }
      return [];
    }
    function Z(av, au) {
      if (!av || !au) {
        return false;
      }
      if (av.contains) {
        return av.contains(au);
      }
      if (av === au) {
        return true;
      }
      if (av.compareDocumentPosition) {
        return !!(av.compareDocumentPosition(au) & 16);
      }
      return false;
    }
    function Q(aw, ax) {
      if (aw && aw.indexOf) {
        return aw.indexOf(ax);
      }
      if (!N(aw) || aw === null) {
        return -1;
      }
      if (!aw.length) {
        return -1;
      }
      var au = aw.length;
      if (au === 0) {
        return -1;
      }
      var av = 0;
      while (av < au) {
        if (aw[av] === ax) {
          return av;
        }
        av++;
      }
      return -1;
    }
    function i(aw) {
      if (!aw) {
        return false;
      }
      function au(ay, az) {
        if (X.getComputedStyle) {
          return K.defaultView.getComputedStyle(ay, null)[az];
        }
        if (ay.currentStyle) {
          return ay.currentStyle[az];
        }
      }
      function ax(ay) {
        ay = ay.parentNode;
        while (ay) {
          if (ay === K) {
            return true;
          }
          ay = ay.parentNode;
        }
        return false;
      }
      function av(aA, aG, ay, aD, aB, aE, aC) {
        var az = aA.parentNode,
          aF = 1;
        if (!ax(aA)) {
          return false;
        }
        if (9 === az.nodeType) {
          return true;
        }
        if (
          '0' === au(aA, 'opacity') ||
          'none' === au(aA, 'display') ||
          'hidden' === au(aA, 'visibility')
        ) {
          return false;
        }
        if (!N(aG) || !N(ay) || !N(aD) || !N(aB) || !N(aE) || !N(aC)) {
          aG = aA.offsetTop;
          aB = aA.offsetLeft;
          aD = aG + aA.offsetHeight;
          ay = aB + aA.offsetWidth;
          aE = aA.offsetWidth;
          aC = aA.offsetHeight;
        }
        if (
          aw === aA &&
          (0 === aC || 0 === aE) &&
          'hidden' === au(aA, 'overflow')
        ) {
          return false;
        }
        if (az) {
          if (
            'hidden' === au(az, 'overflow') ||
            'scroll' === au(az, 'overflow')
          ) {
            if (
              aB + aF > az.offsetWidth + az.scrollLeft ||
              aB + aE - aF < az.scrollLeft ||
              aG + aF > az.offsetHeight + az.scrollTop ||
              aG + aC - aF < az.scrollTop
            ) {
              return false;
            }
          }
          if (aA.offsetParent === az) {
            aB += az.offsetLeft;
            aG += az.offsetTop;
          }
          return av(az, aG, ay, aD, aB, aE, aC);
        }
        return true;
      }
      return av(aw);
    }
    var aj = {
      htmlCollectionToArray: function (aw) {
        var au = [],
          av;
        if (!aw || !aw.length) {
          return au;
        }
        for (av = 0; av < aw.length; av++) {
          au.push(aw[av]);
        }
        return au;
      },
      find: function (au) {
        if (!document.querySelectorAll || !au) {
          return [];
        }
        var av = document.querySelectorAll(au);
        return this.htmlCollectionToArray(av);
      },
      findMultiple: function (aw) {
        if (!aw || !aw.length) {
          return [];
        }
        var av, ax;
        var au = [];
        for (av = 0; av < aw.length; av++) {
          ax = this.find(aw[av]);
          au = au.concat(ax);
        }
        au = this.makeNodesUnique(au);
        return au;
      },
      findNodesByTagName: function (av, au) {
        if (!av || !au || !av.getElementsByTagName) {
          return [];
        }
        var aw = av.getElementsByTagName(au);
        return this.htmlCollectionToArray(aw);
      },
      makeNodesUnique: function (au) {
        var az = [].concat(au);
        au.sort(function (aB, aA) {
          if (aB === aA) {
            return 0;
          }
          var aD = Q(az, aB);
          var aC = Q(az, aA);
          if (aD === aC) {
            return 0;
          }
          return aD > aC ? -1 : 1;
        });
        if (au.length <= 1) {
          return au;
        }
        var av = 0;
        var ax = 0;
        var ay = [];
        var aw;
        aw = au[av++];
        while (aw) {
          if (aw === au[av]) {
            ax = ay.push(av);
          }
          aw = au[av++] || null;
        }
        while (ax--) {
          au.splice(ay[ax], 1);
        }
        return au;
      },
      getAttributeValueFromNode: function (ay, aw) {
        if (!this.hasNodeAttribute(ay, aw)) {
          return;
        }
        if (ay && ay.getAttribute) {
          return ay.getAttribute(aw);
        }
        if (!ay || !ay.attributes) {
          return;
        }
        var ax = typeof ay.attributes[aw];
        if ('undefined' === ax) {
          return;
        }
        if (ay.attributes[aw].value) {
          return ay.attributes[aw].value;
        }
        if (ay.attributes[aw].nodeValue) {
          return ay.attributes[aw].nodeValue;
        }
        var av;
        var au = ay.attributes;
        if (!au) {
          return;
        }
        for (av = 0; av < au.length; av++) {
          if (au[av].nodeName === aw) {
            return au[av].nodeValue;
          }
        }
        return null;
      },
      hasNodeAttributeWithValue: function (av, au) {
        var aw = this.getAttributeValueFromNode(av, au);
        return !!aw;
      },
      hasNodeAttribute: function (aw, au) {
        if (aw && aw.hasAttribute) {
          return aw.hasAttribute(au);
        }
        if (aw && aw.attributes) {
          var av = typeof aw.attributes[au];
          return 'undefined' !== av;
        }
        return false;
      },
      hasNodeCssClass: function (aw, au) {
        if (aw && au && aw.className) {
          var av =
            typeof aw.className === 'string' ? aw.className.split(' ') : [];
          if (-1 !== Q(av, au)) {
            return true;
          }
        }
        return false;
      },
      findNodesHavingAttribute: function (ay, aw, au) {
        if (!au) {
          au = [];
        }
        if (!ay || !aw) {
          return au;
        }
        var ax = T(ay);
        if (!ax || !ax.length) {
          return au;
        }
        var av, az;
        for (av = 0; av < ax.length; av++) {
          az = ax[av];
          if (this.hasNodeAttribute(az, aw)) {
            au.push(az);
          }
          au = this.findNodesHavingAttribute(az, aw, au);
        }
        return au;
      },
      findFirstNodeHavingAttribute: function (aw, av) {
        if (!aw || !av) {
          return;
        }
        if (this.hasNodeAttribute(aw, av)) {
          return aw;
        }
        var au = this.findNodesHavingAttribute(aw, av);
        if (au && au.length) {
          return au[0];
        }
      },
      findFirstNodeHavingAttributeWithValue: function (ax, aw) {
        if (!ax || !aw) {
          return;
        }
        if (this.hasNodeAttributeWithValue(ax, aw)) {
          return ax;
        }
        var au = this.findNodesHavingAttribute(ax, aw);
        if (!au || !au.length) {
          return;
        }
        var av;
        for (av = 0; av < au.length; av++) {
          if (this.getAttributeValueFromNode(au[av], aw)) {
            return au[av];
          }
        }
      },
      findNodesHavingCssClass: function (ay, ax, au) {
        if (!au) {
          au = [];
        }
        if (!ay || !ax) {
          return au;
        }
        if (ay.getElementsByClassName) {
          var az = ay.getElementsByClassName(ax);
          return this.htmlCollectionToArray(az);
        }
        var aw = T(ay);
        if (!aw || !aw.length) {
          return [];
        }
        var av, aA;
        for (av = 0; av < aw.length; av++) {
          aA = aw[av];
          if (this.hasNodeCssClass(aA, ax)) {
            au.push(aA);
          }
          au = this.findNodesHavingCssClass(aA, ax, au);
        }
        return au;
      },
      findFirstNodeHavingClass: function (aw, av) {
        if (!aw || !av) {
          return;
        }
        if (this.hasNodeCssClass(aw, av)) {
          return aw;
        }
        var au = this.findNodesHavingCssClass(aw, av);
        if (au && au.length) {
          return au[0];
        }
      },
      isLinkElement: function (av) {
        if (!av) {
          return false;
        }
        var au = String(av.nodeName).toLowerCase();
        var ax = ['a', 'area'];
        var aw = Q(ax, au);
        return aw !== -1;
      },
      setAnyAttribute: function (av, au, aw) {
        if (!av || !au) {
          return;
        }
        if (av.setAttribute) {
          av.setAttribute(au, aw);
        } else {
          av[au] = aw;
        }
      },
    };
    var x = {
      CONTENT_ATTR: 'data-track-content',
      CONTENT_CLASS: 'matomoTrackContent',
      LEGACY_CONTENT_CLASS: 'piwikTrackContent',
      CONTENT_NAME_ATTR: 'data-content-name',
      CONTENT_PIECE_ATTR: 'data-content-piece',
      CONTENT_PIECE_CLASS: 'matomoContentPiece',
      LEGACY_CONTENT_PIECE_CLASS: 'piwikContentPiece',
      CONTENT_TARGET_ATTR: 'data-content-target',
      CONTENT_TARGET_CLASS: 'matomoContentTarget',
      LEGACY_CONTENT_TARGET_CLASS: 'piwikContentTarget',
      CONTENT_IGNOREINTERACTION_ATTR: 'data-content-ignoreinteraction',
      CONTENT_IGNOREINTERACTION_CLASS: 'matomoContentIgnoreInteraction',
      LEGACY_CONTENT_IGNOREINTERACTION_CLASS: 'piwikContentIgnoreInteraction',
      location: undefined,
      findContentNodes: function () {
        var av = '.' + this.CONTENT_CLASS;
        var aw = '.' + this.LEGACY_CONTENT_CLASS;
        var au = '[' + this.CONTENT_ATTR + ']';
        var ax = aj.findMultiple([av, aw, au]);
        return ax;
      },
      findContentNodesWithinNode: function (ax) {
        if (!ax) {
          return [];
        }
        var av = aj.findNodesHavingCssClass(ax, this.CONTENT_CLASS);
        av = aj.findNodesHavingCssClass(ax, this.LEGACY_CONTENT_CLASS, av);
        var au = aj.findNodesHavingAttribute(ax, this.CONTENT_ATTR);
        if (au && au.length) {
          var aw;
          for (aw = 0; aw < au.length; aw++) {
            av.push(au[aw]);
          }
        }
        if (aj.hasNodeAttribute(ax, this.CONTENT_ATTR)) {
          av.push(ax);
        } else {
          if (aj.hasNodeCssClass(ax, this.CONTENT_CLASS)) {
            av.push(ax);
          } else {
            if (aj.hasNodeCssClass(ax, this.LEGACY_CONTENT_CLASS)) {
              av.push(ax);
            }
          }
        }
        av = aj.makeNodesUnique(av);
        return av;
      },
      findParentContentNode: function (av) {
        if (!av) {
          return;
        }
        var aw = av;
        var au = 0;
        while (aw && aw !== K && aw.parentNode) {
          if (aj.hasNodeAttribute(aw, this.CONTENT_ATTR)) {
            return aw;
          }
          if (aj.hasNodeCssClass(aw, this.CONTENT_CLASS)) {
            return aw;
          }
          if (aj.hasNodeCssClass(aw, this.LEGACY_CONTENT_CLASS)) {
            return aw;
          }
          aw = aw.parentNode;
          if (au > 1000) {
            break;
          }
          au++;
        }
      },
      findPieceNode: function (av) {
        var au;
        au = aj.findFirstNodeHavingAttribute(av, this.CONTENT_PIECE_ATTR);
        if (!au) {
          au = aj.findFirstNodeHavingClass(av, this.CONTENT_PIECE_CLASS);
        }
        if (!au) {
          au = aj.findFirstNodeHavingClass(av, this.LEGACY_CONTENT_PIECE_CLASS);
        }
        if (au) {
          return au;
        }
        return av;
      },
      findTargetNodeNoDefault: function (au) {
        if (!au) {
          return;
        }
        var av = aj.findFirstNodeHavingAttributeWithValue(
          au,
          this.CONTENT_TARGET_ATTR
        );
        if (av) {
          return av;
        }
        av = aj.findFirstNodeHavingAttribute(au, this.CONTENT_TARGET_ATTR);
        if (av) {
          return av;
        }
        av = aj.findFirstNodeHavingClass(au, this.CONTENT_TARGET_CLASS);
        if (av) {
          return av;
        }
        av = aj.findFirstNodeHavingClass(au, this.LEGACY_CONTENT_TARGET_CLASS);
        if (av) {
          return av;
        }
      },
      findTargetNode: function (au) {
        var av = this.findTargetNodeNoDefault(au);
        if (av) {
          return av;
        }
        return au;
      },
      findContentName: function (av) {
        if (!av) {
          return;
        }
        var ay = aj.findFirstNodeHavingAttributeWithValue(
          av,
          this.CONTENT_NAME_ATTR
        );
        if (ay) {
          return aj.getAttributeValueFromNode(ay, this.CONTENT_NAME_ATTR);
        }
        var au = this.findContentPiece(av);
        if (au) {
          return this.removeDomainIfIsInLink(au);
        }
        if (aj.hasNodeAttributeWithValue(av, 'title')) {
          return aj.getAttributeValueFromNode(av, 'title');
        }
        var aw = this.findPieceNode(av);
        if (aj.hasNodeAttributeWithValue(aw, 'title')) {
          return aj.getAttributeValueFromNode(aw, 'title');
        }
        var ax = this.findTargetNode(av);
        if (aj.hasNodeAttributeWithValue(ax, 'title')) {
          return aj.getAttributeValueFromNode(ax, 'title');
        }
      },
      findContentPiece: function (av) {
        if (!av) {
          return;
        }
        var ax = aj.findFirstNodeHavingAttributeWithValue(
          av,
          this.CONTENT_PIECE_ATTR
        );
        if (ax) {
          return aj.getAttributeValueFromNode(ax, this.CONTENT_PIECE_ATTR);
        }
        var au = this.findPieceNode(av);
        var aw = this.findMediaUrlInNode(au);
        if (aw) {
          return this.toAbsoluteUrl(aw);
        }
      },
      findContentTarget: function (aw) {
        if (!aw) {
          return;
        }
        var ax = this.findTargetNode(aw);
        if (aj.hasNodeAttributeWithValue(ax, this.CONTENT_TARGET_ATTR)) {
          return aj.getAttributeValueFromNode(ax, this.CONTENT_TARGET_ATTR);
        }
        var av;
        if (aj.hasNodeAttributeWithValue(ax, 'href')) {
          av = aj.getAttributeValueFromNode(ax, 'href');
          return this.toAbsoluteUrl(av);
        }
        var au = this.findPieceNode(aw);
        if (aj.hasNodeAttributeWithValue(au, 'href')) {
          av = aj.getAttributeValueFromNode(au, 'href');
          return this.toAbsoluteUrl(av);
        }
      },
      isSameDomain: function (au) {
        if (!au || !au.indexOf) {
          return false;
        }
        if (0 === au.indexOf(this.getLocation().origin)) {
          return true;
        }
        var av = au.indexOf(this.getLocation().host);
        if (8 >= av && 0 <= av) {
          return true;
        }
        return false;
      },
      removeDomainIfIsInLink: function (aw) {
        var av = '^https?://[^/]+';
        var au = '^.*//[^/]+';
        if (
          aw &&
          aw.search &&
          -1 !== aw.search(new RegExp(av)) &&
          this.isSameDomain(aw)
        ) {
          aw = aw.replace(new RegExp(au), '');
          if (!aw) {
            aw = '/';
          }
        }
        return aw;
      },
      findMediaUrlInNode: function (ay) {
        if (!ay) {
          return;
        }
        var aw = ['img', 'embed', 'video', 'audio'];
        var au = ay.nodeName.toLowerCase();
        if (
          -1 !== Q(aw, au) &&
          aj.findFirstNodeHavingAttributeWithValue(ay, 'src')
        ) {
          var ax = aj.findFirstNodeHavingAttributeWithValue(ay, 'src');
          return aj.getAttributeValueFromNode(ax, 'src');
        }
        if (au === 'object' && aj.hasNodeAttributeWithValue(ay, 'data')) {
          return aj.getAttributeValueFromNode(ay, 'data');
        }
        if (au === 'object') {
          var az = aj.findNodesByTagName(ay, 'param');
          if (az && az.length) {
            var av;
            for (av = 0; av < az.length; av++) {
              if (
                'movie' === aj.getAttributeValueFromNode(az[av], 'name') &&
                aj.hasNodeAttributeWithValue(az[av], 'value')
              ) {
                return aj.getAttributeValueFromNode(az[av], 'value');
              }
            }
          }
          var aA = aj.findNodesByTagName(ay, 'embed');
          if (aA && aA.length) {
            return this.findMediaUrlInNode(aA[0]);
          }
        }
      },
      trim: function (au) {
        return a(au);
      },
      isOrWasNodeInViewport: function (az) {
        if (!az || !az.getBoundingClientRect || az.nodeType !== 1) {
          return true;
        }
        var ay = az.getBoundingClientRect();
        var ax = K.documentElement || {};
        var aw = ay.top < 0;
        if (aw && az.offsetTop) {
          aw = az.offsetTop + ay.height > 0;
        }
        var av = ax.clientWidth;
        if (X.innerWidth && av > X.innerWidth) {
          av = X.innerWidth;
        }
        var au = ax.clientHeight;
        if (X.innerHeight && au > X.innerHeight) {
          au = X.innerHeight;
        }
        return (
          (ay.bottom > 0 || aw) &&
          ay.right > 0 &&
          ay.left < av &&
          (ay.top < au || aw)
        );
      },
      isNodeVisible: function (av) {
        var au = i(av);
        var aw = this.isOrWasNodeInViewport(av);
        return au && aw;
      },
      buildInteractionRequestParams: function (au, av, aw, ax) {
        var ay = '';
        if (au) {
          ay += 'c_i=' + u(au);
        }
        if (av) {
          if (ay) {
            ay += '&';
          }
          ay += 'c_n=' + u(av);
        }
        if (aw) {
          if (ay) {
            ay += '&';
          }
          ay += 'c_p=' + u(aw);
        }
        if (ax) {
          if (ay) {
            ay += '&';
          }
          ay += 'c_t=' + u(ax);
        }
        if (ay) {
          ay += '&ca=1';
        }
        return ay;
      },
      buildImpressionRequestParams: function (au, av, aw) {
        var ax = 'c_n=' + u(au) + '&c_p=' + u(av);
        if (aw) {
          ax += '&c_t=' + u(aw);
        }
        if (ax) {
          ax += '&ca=1';
        }
        return ax;
      },
      buildContentBlock: function (aw) {
        if (!aw) {
          return;
        }
        var au = this.findContentName(aw);
        var av = this.findContentPiece(aw);
        var ax = this.findContentTarget(aw);
        au = this.trim(au);
        av = this.trim(av);
        ax = this.trim(ax);
        return {
          name: au || 'Unknown',
          piece: av || 'Unknown',
          target: ax || '',
        };
      },
      collectContent: function (ax) {
        if (!ax || !ax.length) {
          return [];
        }
        var aw = [];
        var au, av;
        for (au = 0; au < ax.length; au++) {
          av = this.buildContentBlock(ax[au]);
          if (N(av)) {
            aw.push(av);
          }
        }
        return aw;
      },
      setLocation: function (au) {
        this.location = au;
      },
      getLocation: function () {
        var au = this.location || X.location;
        if (!au.origin) {
          au.origin =
            au.protocol + '//' + au.hostname + (au.port ? ':' + au.port : '');
        }
        return au;
      },
      toAbsoluteUrl: function (av) {
        if ((!av || String(av) !== av) && av !== '') {
          return av;
        }
        if ('' === av) {
          return this.getLocation().href;
        }
        if (av.search(/^\/\//) !== -1) {
          return this.getLocation().protocol + av;
        }
        if (av.search(/:\/\//) !== -1) {
          return av;
        }
        if (0 === av.indexOf('#')) {
          return this.getLocation().origin + this.getLocation().pathname + av;
        }
        if (0 === av.indexOf('?')) {
          return this.getLocation().origin + this.getLocation().pathname + av;
        }
        if (0 === av.search('^[a-zA-Z]{2,11}:')) {
          return av;
        }
        if (av.search(/^\//) !== -1) {
          return this.getLocation().origin + av;
        }
        var au = '(.*/)';
        var aw =
          this.getLocation().origin +
          this.getLocation().pathname.match(new RegExp(au))[0];
        return aw + av;
      },
      isUrlToCurrentDomain: function (av) {
        var aw = this.toAbsoluteUrl(av);
        if (!aw) {
          return false;
        }
        var au = this.getLocation().origin;
        if (au === aw) {
          return true;
        }
        if (0 === String(aw).indexOf(au)) {
          if (':' === String(aw).substr(au.length, 1)) {
            return false;
          }
          return true;
        }
        return false;
      },
      setHrefAttribute: function (av, au) {
        if (!av || !au) {
          return;
        }
        aj.setAnyAttribute(av, 'href', au);
      },
      shouldIgnoreInteraction: function (au) {
        if (aj.hasNodeAttribute(au, this.CONTENT_IGNOREINTERACTION_ATTR)) {
          return true;
        }
        if (aj.hasNodeCssClass(au, this.CONTENT_IGNOREINTERACTION_CLASS)) {
          return true;
        }
        if (
          aj.hasNodeCssClass(au, this.LEGACY_CONTENT_IGNOREINTERACTION_CLASS)
        ) {
          return true;
        }
        return false;
      },
    };
    function ab(av, ay) {
      if (ay) {
        return ay;
      }
      av = x.toAbsoluteUrl(av);
      if (B(av, '?')) {
        var ax = av.indexOf('?');
        av = av.slice(0, ax);
      }
      if (V(av, 'matomo.php')) {
        av = f(av, 'matomo.php'.length);
      } else {
        if (V(av, 'piwik.php')) {
          av = f(av, 'piwik.php'.length);
        } else {
          if (V(av, '.php')) {
            var au = av.lastIndexOf('/');
            var aw = 1;
            av = av.slice(0, au + aw);
          }
        }
      }
      if (V(av, '/js/')) {
        av = f(av, 'js/'.length);
      }
      return av;
    }
    function S(aA) {
      var aC = 'Matomo_Overlay';
      var av = new RegExp(
        'index\\.php\\?module=Overlay&action=startOverlaySession&idSite=([0-9]+)&period=([^&]+)&date=([^&]+)(&segment=[^&]*)?'
      );
      var aw = av.exec(K.referrer);
      if (aw) {
        var ay = aw[1];
        if (ay !== String(aA)) {
          return false;
        }
        var az = aw[2],
          au = aw[3],
          ax = aw[4];
        if (!ax) {
          ax = '';
        } else {
          if (ax.indexOf('&segment=') === 0) {
            ax = ax.substr('&segment='.length);
          }
        }
        X.name = aC + '###' + az + '###' + au + '###' + ax;
      }
      var aB = X.name.split('###');
      return aB.length === 4 && aB[0] === aC;
    }
    function ae(av, aA, aw) {
      var az = X.name.split('###'),
        ay = az[1],
        au = az[2],
        ax = az[3],
        aB = ab(av, aA);
      o(aB + 'plugins/Overlay/client/client.js?v=1', function () {
        Matomo_Overlay_Client.initialize(aB, aw, ay, au, ax);
      });
    }
    function w() {
      var aw;
      try {
        aw = X.frameElement;
      } catch (av) {
        return true;
      }
      if (N(aw)) {
        return aw && String(aw.nodeName).toLowerCase() === 'iframe'
          ? true
          : false;
      }
      try {
        return X.self !== X.top;
      } catch (au) {
        return true;
      }
    }
    function U(ct, cn) {
      var bV = this,
        bo = 'mtm_consent',
        c0 = 'mtm_cookie_consent',
        c9 = 'mtm_consent_removed',
        ch = af(K.domain, X.location.href, O()),
        dh = P(ch[0]),
        bZ = p(ch[1]),
        bA = p(ch[2]),
        df = false,
        cx = 'GET',
        dA = cx,
        aQ = 'application/x-www-form-urlencoded; charset=UTF-8',
        cR = aQ,
        aM = ct || '',
        bU = '',
        dp = '',
        cD = '',
        cj = cn || '',
        bL = '',
        b0 = '',
        bf,
        bu = '',
        dw = [
          '7z',
          'aac',
          'apk',
          'arc',
          'arj',
          'asc',
          'asf',
          'asx',
          'avi',
          'azw3',
          'bin',
          'csv',
          'deb',
          'dmg',
          'doc',
          'docx',
          'epub',
          'exe',
          'flv',
          'gif',
          'gz',
          'gzip',
          'hqx',
          'ibooks',
          'jar',
          'jpg',
          'jpeg',
          'js',
          'md5',
          'mobi',
          'mp2',
          'mp3',
          'mp4',
          'mpg',
          'mpeg',
          'mov',
          'movie',
          'msi',
          'msp',
          'odb',
          'odf',
          'odg',
          'ods',
          'odt',
          'ogg',
          'ogv',
          'pdf',
          'phps',
          'png',
          'ppt',
          'pptx',
          'qt',
          'qtm',
          'ra',
          'ram',
          'rar',
          'rpm',
          'rtf',
          'sea',
          'sha',
          'sha256',
          'sha512',
          'sig',
          'sit',
          'tar',
          'tbz',
          'tbz2',
          'bz',
          'bz2',
          'tgz',
          'torrent',
          'txt',
          'wav',
          'wma',
          'wmv',
          'wpd',
          'xls',
          'xlsx',
          'xml',
          'xz',
          'z',
          'zip',
        ],
        aG = [dh],
        bM = [],
        cS = ['.paypal.com'],
        cy = [],
        bY = [],
        bj = [],
        bW = 500,
        dk = true,
        c6,
        bg,
        b4,
        b1,
        aw,
        cH = [
          'pk_campaign',
          'mtm_campaign',
          'piwik_campaign',
          'matomo_campaign',
          'utm_campaign',
          'utm_source',
          'utm_medium',
        ],
        bT = ['pk_kwd', 'mtm_kwd', 'piwik_kwd', 'matomo_kwd', 'utm_term'],
        bv = '_pk_',
        aD = 'pk_vid',
        ba = 180,
        dm,
        bC,
        b5 = false,
        aR = 'Lax',
        bx = false,
        dd,
        bp,
        bI,
        c7 = 33955200000,
        cE = 1800000,
        dv = 15768000000,
        bd = true,
        bR = false,
        bs = false,
        b3 = false,
        aZ = false,
        cq,
        b9 = {},
        cC = {},
        bz = {},
        bG = 200,
        cN = {},
        dq = {},
        dx = {},
        a3 = {},
        co = [],
        by = false,
        ck = false,
        cp = [],
        cu = false,
        cY = false,
        ax = false,
        dy = false,
        da = false,
        aW = false,
        bn = w(),
        cT = null,
        dn = null,
        a0,
        bO,
        cl = ar,
        bB,
        aU,
        bN = false,
        cK = 0,
        bH = ['id', 'ses', 'cvar', 'ref'],
        cX = false,
        bP = null,
        c8 = [],
        cM = [],
        aF = Y++,
        aE = false,
        dl = true,
        cV = false;
      try {
        bu = K.title;
      } catch (cU) {
        bu = '';
      }
      function aL(dL) {
        if (bx && dL !== c9) {
          return 0;
        }
        var dJ = new RegExp('(^|;)[ ]*' + dL + '=([^;]*)'),
          dK = dJ.exec(K.cookie);
        return dK ? W(dK[2]) : 0;
      }
      bP = !aL(c9);
      function dE(dN, dO, dR, dQ, dL, dM, dP) {
        if (bx && dN !== c9) {
          return;
        }
        var dK;
        if (dR) {
          dK = new Date();
          dK.setTime(dK.getTime() + dR);
        }
        if (!dP) {
          dP = 'Lax';
        }
        K.cookie =
          dN +
          '=' +
          u(dO) +
          (dR ? ';expires=' + dK.toGMTString() : '') +
          ';path=' +
          (dQ || '/') +
          (dL ? ';domain=' + dL : '') +
          (dM ? ';secure' : '') +
          ';SameSite=' +
          dP;
        if ((!dR || dR >= 0) && aL(dN) !== String(dO)) {
          var dJ =
            'There was an error setting cookie `' +
            dN +
            '`. Please check domain and path.';
          ap(dJ);
        }
      }
      function cf(dJ) {
        var dL, dK;
        dJ = j(dJ, aD);
        dJ = j(dJ, 'ignore_referrer');
        dJ = j(dJ, 'ignore_referer');
        for (dK = 0; dK < cy.length; dK++) {
          dJ = j(dJ, cy[dK]);
        }
        if (b1) {
          dL = new RegExp('#.*');
          return dJ.replace(dL, '');
        }
        return dJ;
      }
      function b8(dL, dJ) {
        var dM = t(dJ),
          dK;
        if (dM) {
          return dJ;
        }
        if (dJ.slice(0, 1) === '/') {
          return t(dL) + '://' + d(dL) + dJ;
        }
        dL = cf(dL);
        dK = dL.indexOf('?');
        if (dK >= 0) {
          dL = dL.slice(0, dK);
        }
        dK = dL.lastIndexOf('/');
        if (dK !== dL.length - 1) {
          dL = dL.slice(0, dK + 1);
        }
        return dL + dJ;
      }
      function c4(dL, dJ) {
        var dK;
        dL = String(dL).toLowerCase();
        dJ = String(dJ).toLowerCase();
        if (dL === dJ) {
          return true;
        }
        if (dJ.slice(0, 1) === '.') {
          if (dL === dJ.slice(1)) {
            return true;
          }
          dK = dL.length - dJ.length;
          if (dK > 0 && dL.slice(dK) === dJ) {
            return true;
          }
        }
        return false;
      }
      function cB(dJ) {
        var dK = document.createElement('a');
        if (dJ.indexOf('//') !== 0 && dJ.indexOf('http') !== 0) {
          if (dJ.indexOf('*') === 0) {
            dJ = dJ.substr(1);
          }
          if (dJ.indexOf('.') === 0) {
            dJ = dJ.substr(1);
          }
          dJ = 'http://' + dJ;
        }
        dK.href = x.toAbsoluteUrl(dJ);
        if (dK.pathname) {
          return dK.pathname;
        }
        return '';
      }
      function be(dK, dJ) {
        if (!ao(dJ, '/')) {
          dJ = '/' + dJ;
        }
        if (!ao(dK, '/')) {
          dK = '/' + dK;
        }
        var dL = dJ === '/' || dJ === '/*';
        if (dL) {
          return true;
        }
        if (dK === dJ) {
          return true;
        }
        dJ = String(dJ).toLowerCase();
        dK = String(dK).toLowerCase();
        if (V(dJ, '*')) {
          dJ = dJ.slice(0, -1);
          dL = !dJ || dJ === '/';
          if (dL) {
            return true;
          }
          if (dK === dJ) {
            return true;
          }
          return dK.indexOf(dJ) === 0;
        }
        if (!V(dK, '/')) {
          dK += '/';
        }
        if (!V(dJ, '/')) {
          dJ += '/';
        }
        return dK.indexOf(dJ) === 0;
      }
      function aA(dN, dP) {
        var dK, dJ, dL, dM, dO;
        for (dK = 0; dK < aG.length; dK++) {
          dM = P(aG[dK]);
          dO = cB(aG[dK]);
          if (c4(dN, dM) && be(dP, dO)) {
            return true;
          }
        }
        return false;
      }
      function a6(dM) {
        var dK, dJ, dL;
        for (dK = 0; dK < aG.length; dK++) {
          dJ = P(aG[dK].toLowerCase());
          if (dM === dJ) {
            return true;
          }
          if (dJ.slice(0, 1) === '.') {
            if (dM === dJ.slice(1)) {
              return true;
            }
            dL = dM.length - dJ.length;
            if (dL > 0 && dM.slice(dL) === dJ) {
              return true;
            }
          }
        }
        return false;
      }
      function cJ(dJ) {
        var dK, dM, dO, dL, dN;
        if (!dJ.length || !cS.length) {
          return false;
        }
        dM = d(dJ);
        dO = cB(dJ);
        if (dM.indexOf('www.') === 0) {
          dM = dM.substr(4);
        }
        for (dK = 0; dK < cS.length; dK++) {
          dL = P(cS[dK]);
          dN = cB(cS[dK]);
          if (dL.indexOf('www.') === 0) {
            dL = dL.substr(4);
          }
          if (c4(dM, dL) && be(dO, dN)) {
            return true;
          }
        }
        return false;
      }
      function au() {
        if (q && q.length > 0) {
          return true;
        }
        q = e(X.location.href, 'tracker_install_check');
        return q && q.length > 0;
      }
      function cI() {
        if (au() && aa(X)) {
          X.close();
        }
      }
      function cF(dJ, dL) {
        dJ = dJ.replace('send_image=0', 'send_image=1');
        var dK = new Image(1, 1);
        dK.onload = function () {
          I = 0;
          if (typeof dL === 'function') {
            dL({ request: dJ, trackerUrl: aM, success: true });
          }
        };
        dK.onerror = function () {
          if (typeof dL === 'function') {
            dL({ request: dJ, trackerUrl: aM, success: false });
          }
        };
        dK.src = aM + (aM.indexOf('?') < 0 ? '?' : '&') + dJ;
        cI();
      }
      function c1(dJ) {
        if (dA === 'POST') {
          return true;
        }
        return dJ && (dJ.length > 2000 || dJ.indexOf('{"requests"') === 0);
      }
      function aT() {
        return (
          'object' === typeof g &&
          'function' === typeof g.sendBeacon &&
          'function' === typeof Blob
        );
      }
      function bh(dN, dQ, dP) {
        var dL = aT();
        if (!dL) {
          return false;
        }
        var dM = { type: 'application/x-www-form-urlencoded; charset=UTF-8' };
        var dR = false;
        var dK = aM;
        try {
          var dJ = new Blob([dN], dM);
          if (dP && !c1(dN)) {
            dJ = new Blob([], dM);
            dK = dK + (dK.indexOf('?') < 0 ? '?' : '&') + dN;
          }
          dR = g.sendBeacon(dK, dJ);
        } catch (dO) {
          return false;
        }
        if (dR && typeof dQ === 'function') {
          dQ({
            request: dN,
            trackerUrl: aM,
            success: true,
            isSendBeacon: true,
          });
        }
        cI();
        return dR;
      }
      function du(dK, dL, dJ) {
        if (!N(dJ) || null === dJ) {
          dJ = true;
        }
        if (m && bh(dK, dL, dJ)) {
          return;
        }
        setTimeout(function () {
          if (m && bh(dK, dL, dJ)) {
            return;
          }
          var dO;
          try {
            var dN = X.XMLHttpRequest
              ? new X.XMLHttpRequest()
              : X.ActiveXObject
              ? new ActiveXObject('Microsoft.XMLHTTP')
              : null;
            dN.open('POST', aM, true);
            dN.onreadystatechange = function () {
              if (
                this.readyState === 4 &&
                !(this.status >= 200 && this.status < 300)
              ) {
                var dP = m && bh(dK, dL, dJ);
                if (!dP && dJ) {
                  cF(dK, dL);
                } else {
                  if (typeof dL === 'function') {
                    dL({
                      request: dK,
                      trackerUrl: aM,
                      success: false,
                      xhr: this,
                    });
                  }
                }
              } else {
                if (this.readyState === 4 && typeof dL === 'function') {
                  dL({ request: dK, trackerUrl: aM, success: true, xhr: this });
                }
              }
            };
            dN.setRequestHeader('Content-Type', cR);
            dN.withCredentials = true;
            dN.send(dK);
          } catch (dM) {
            dO = m && bh(dK, dL, dJ);
            if (!dO && dJ) {
              cF(dK, dL);
            } else {
              if (typeof dL === 'function') {
                dL({ request: dK, trackerUrl: aM, success: false });
              }
            }
          }
          cI();
        }, 50);
      }
      function cv(dK) {
        var dJ = new Date();
        var dL = dJ.getTime() + dK;
        if (!s || dL > s) {
          s = dL;
        }
      }
      function bl() {
        bn = true;
        cT = new Date().getTime();
      }
      function dD() {
        var dJ = new Date().getTime();
        return !cT || dJ - cT > bg;
      }
      function aH() {
        if (dD()) {
          b4();
        }
      }
      function a5() {
        if (K.visibilityState === 'hidden' && dD()) {
          b4();
        } else {
          if (K.visibilityState === 'visible') {
            cT = new Date().getTime();
          }
        }
      }
      function dH() {
        if (aW || !bg) {
          return;
        }
        aW = true;
        at(X, 'focus', bl);
        at(X, 'blur', aH);
        at(X, 'visibilitychange', a5);
        ag++;
        v.addPlugin('HeartBeat' + ag, {
          unload: function () {
            if (aW && dD()) {
              b4();
            }
          },
        });
      }
      function cZ(dN) {
        var dK = new Date();
        var dJ = dK.getTime();
        dn = dJ;
        if (cY && dJ < cY) {
          var dL = cY - dJ;
          setTimeout(dN, dL);
          cv(dL + 50);
          cY += 50;
          return;
        }
        if (cY === false) {
          var dM = 800;
          cY = dJ + dM;
        }
        dN();
      }
      function aX() {
        if (aL(c9)) {
          bP = false;
        } else {
          if (aL(bo)) {
            bP = true;
          }
        }
      }
      function b2(dM) {
        var dL,
          dK = '',
          dJ = '';
        for (dL in dx) {
          if (Object.prototype.hasOwnProperty.call(dx, dL)) {
            dJ += '&' + dL + '=' + dx[dL];
          }
        }
        if (a3) {
          dK = '&uadata=' + u(X.JSON.stringify(a3));
        }
        if (dM instanceof Array) {
          for (dL = 0; dL < dM.length; dL++) {
            dM[dL] += dK + dJ;
          }
        } else {
          dM += dK + dJ;
        }
        return dM;
      }
      function av() {
        return N(g.userAgentData) && D(g.userAgentData.getHighEntropyValues);
      }
      function cG(dJ) {
        if (by || ck) {
          return;
        }
        ck = true;
        a3 = {
          brands: g.userAgentData.brands,
          platform: g.userAgentData.platform,
        };
        g.userAgentData
          .getHighEntropyValues([
            'brands',
            'model',
            'platform',
            'platformVersion',
            'uaFullVersion',
            'fullVersionList',
          ])
          .then(
            function (dL) {
              var dK;
              if (dL.fullVersionList) {
                delete dL.brands;
                delete dL.uaFullVersion;
              }
              a3 = dL;
              by = true;
              ck = false;
              dJ();
            },
            function (dK) {
              by = true;
              ck = false;
              dJ();
            }
          );
      }
      function bS(dK, dJ, dL) {
        aX();
        if (!bP) {
          c8.push([dK, dL]);
          return;
        }
        if (dl && !by && av()) {
          co.push([dK, dL]);
          return;
        }
        aE = true;
        if (!dd && dK) {
          if (cX && bP) {
            dK += '&consent=1';
          }
          dK = b2(dK);
          cZ(function () {
            if (dk && bh(dK, dL, true)) {
              cv(100);
              return;
            }
            if (c1(dK)) {
              du(dK, dL);
            } else {
              cF(dK, dL);
            }
            cv(dJ);
          });
        }
        if (!aW) {
          dH();
        }
      }
      function cA(dJ) {
        if (dd) {
          return false;
        }
        return dJ && dJ.length;
      }
      function dt(dJ, dN) {
        if (!dN || dN >= dJ.length) {
          return [dJ];
        }
        var dK = 0;
        var dL = dJ.length;
        var dM = [];
        for (dK; dK < dL; dK += dN) {
          dM.push(dJ.slice(dK, dK + dN));
        }
        return dM;
      }
      function dF(dK, dJ) {
        if (!cA(dK)) {
          return;
        }
        if (dl && !by && av()) {
          co.push([dK, null]);
          return;
        }
        if (!bP) {
          c8.push([dK, null]);
          return;
        }
        aE = true;
        cZ(function () {
          var dN = dt(dK, 50);
          var dL = 0,
            dM;
          for (dL; dL < dN.length; dL++) {
            dM =
              '{"requests":["?' +
              b2(dN[dL]).join('","?') +
              '"],"send_image":0}';
            if (dk && bh(dM, null, false)) {
              cv(100);
            } else {
              du(dM, null, false);
            }
          }
          cv(dJ);
        });
      }
      function a2(dJ) {
        return bv + dJ + '.' + cj + '.' + bB;
      }
      function cc(dL, dK, dJ) {
        dE(dL, '', -129600000, dK, dJ);
      }
      function ci() {
        if (bx) {
          return '0';
        }
        if (!N(X.showModalDialog) && N(g.cookieEnabled)) {
          return g.cookieEnabled ? '1' : '0';
        }
        var dJ = bv + 'testcookie';
        dE(dJ, '1', undefined, bC, dm, b5, aR);
        var dK = aL(dJ) === '1' ? '1' : '0';
        cc(dJ);
        return dK;
      }
      function bt() {
        bB = cl((dm || dh) + (bC || '/')).slice(0, 4);
      }
      function ay() {
        var dK, dJ;
        for (dK = 0; dK < co.length; dK++) {
          dJ = typeof co[dK][0];
          if (dJ === 'string') {
            bS(co[dK][0], bW, co[dK][1]);
          } else {
            if (dJ === 'object') {
              dF(co[dK][0], bW);
            }
          }
        }
        co = [];
      }
      function c5() {
        if (!dl) {
          return {};
        }
        if (av()) {
          cG(ay);
        }
        if (N(dx.res)) {
          return dx;
        }
        var dK,
          dM,
          dN = {
            pdf: 'application/pdf',
            qt: 'video/quicktime',
            realp: 'audio/x-pn-realaudio-plugin',
            wma: 'application/x-mplayer2',
            fla: 'application/x-shockwave-flash',
            java: 'application/x-java-vm',
            ag: 'application/x-silverlight',
          };
        if (!new RegExp('MSIE').test(g.userAgent)) {
          if (g.mimeTypes && g.mimeTypes.length) {
            for (dK in dN) {
              if (Object.prototype.hasOwnProperty.call(dN, dK)) {
                dM = g.mimeTypes[dN[dK]];
                dx[dK] = dM && dM.enabledPlugin ? '1' : '0';
              }
            }
          }
          if (
            !new RegExp('Edge[ /](\\d+[\\.\\d]+)').test(g.userAgent) &&
            typeof navigator.javaEnabled !== 'unknown' &&
            N(g.javaEnabled) &&
            g.javaEnabled()
          ) {
            dx.java = '1';
          }
          if (!N(X.showModalDialog) && N(g.cookieEnabled)) {
            dx.cookie = g.cookieEnabled ? '1' : '0';
          } else {
            dx.cookie = ci();
          }
        }
        var dL = parseInt(ac.width, 10);
        var dJ = parseInt(ac.height, 10);
        dx.res = parseInt(dL, 10) + 'x' + parseInt(dJ, 10);
        return dx;
      }
      function ca() {
        var dK = a2('cvar'),
          dJ = aL(dK);
        if (dJ && dJ.length) {
          dJ = X.JSON.parse(dJ);
          if (aa(dJ)) {
            return dJ;
          }
        }
        return {};
      }
      function c2() {
        if (aZ === false) {
          aZ = ca();
        }
      }
      function de() {
        var dJ = c5();
        return cl(
          (g.userAgent || '') +
            (g.platform || '') +
            X.JSON.stringify(dJ) +
            new Date().getTime() +
            Math.random()
        ).slice(0, 16);
      }
      function aJ() {
        var dJ = c5();
        return cl(
          (g.userAgent || '') + (g.platform || '') + X.JSON.stringify(dJ)
        ).slice(0, 6);
      }
      function bq() {
        return Math.floor(new Date().getTime() / 1000);
      }
      function aS() {
        var dK = bq();
        var dL = aJ();
        var dJ = String(dK) + dL;
        return dJ;
      }
      function ds(dL) {
        dL = String(dL);
        var dO = aJ();
        var dM = dO.length;
        var dN = dL.substr(-1 * dM, dM);
        var dK = parseInt(dL.substr(0, dL.length - dM), 10);
        if (dK && dN && dN === dO) {
          var dJ = bq();
          if (ba <= 0) {
            return true;
          }
          if (dJ >= dK && dJ <= dK + ba) {
            return true;
          }
        }
        return false;
      }
      function dG(dJ) {
        if (!da) {
          return '';
        }
        var dN = e(dJ, aD);
        if (!dN) {
          return '';
        }
        dN = String(dN);
        var dL = new RegExp('^[a-zA-Z0-9]+$');
        if (dN.length === 32 && dL.test(dN)) {
          var dK = dN.substr(16, 32);
          if (ds(dK)) {
            var dM = dN.substr(0, 16);
            return dM;
          }
        }
        return '';
      }
      function db() {
        if (!b0) {
          b0 = dG(bZ);
        }
        var dL = new Date(),
          dJ = Math.round(dL.getTime() / 1000),
          dK = a2('id'),
          dO = aL(dK),
          dN,
          dM;
        if (dO) {
          dN = dO.split('.');
          dN.unshift('0');
          if (b0.length) {
            dN[1] = b0;
          }
          return dN;
        }
        if (b0.length) {
          dM = b0;
        } else {
          if ('0' === ci()) {
            dM = '';
          } else {
            dM = de();
          }
        }
        dN = ['1', dM, dJ];
        return dN;
      }
      function a9() {
        var dM = db(),
          dK = dM[0],
          dL = dM[1],
          dJ = dM[2];
        return { newVisitor: dK, uuid: dL, createTs: dJ };
      }
      function aP() {
        var dM = new Date(),
          dK = dM.getTime(),
          dN = a9().createTs;
        var dJ = parseInt(dN, 10);
        var dL = dJ * 1000 + c7 - dK;
        return dL;
      }
      function aV(dJ) {
        if (!cj) {
          return;
        }
        var dL = new Date(),
          dK = Math.round(dL.getTime() / 1000);
        if (!N(dJ)) {
          dJ = a9();
        }
        var dM = dJ.uuid + '.' + dJ.createTs + '.';
        dE(a2('id'), dM, aP(), bC, dm, b5, aR);
      }
      function bX() {
        var dJ = aL(a2('ref'));
        if (dJ.length) {
          try {
            dJ = X.JSON.parse(dJ);
            if (aa(dJ)) {
              return dJ;
            }
          } catch (dK) {}
        }
        return ['', '', 0, ''];
      }
      function bJ(dL) {
        var dK = bv + 'testcookie_domain';
        var dJ = 'testvalue';
        dE(dK, dJ, 10000, null, dL, b5, aR);
        if (aL(dK) === dJ) {
          cc(dK, null, dL);
          return true;
        }
        return false;
      }
      function aN() {
        var dK = bx;
        bx = false;
        var dJ, dL;
        for (dJ = 0; dJ < bH.length; dJ++) {
          dL = a2(bH[dJ]);
          if (dL !== c9 && dL !== bo && 0 !== aL(dL)) {
            cc(dL, bC, dm);
          }
        }
        bx = dK;
      }
      function cg(dJ) {
        cj = dJ;
      }
      function dI(dN) {
        if (!dN || !aa(dN)) {
          return;
        }
        var dM = [];
        var dL;
        for (dL in dN) {
          if (Object.prototype.hasOwnProperty.call(dN, dL)) {
            dM.push(dL);
          }
        }
        var dO = {};
        dM.sort();
        var dJ = dM.length;
        var dK;
        for (dK = 0; dK < dJ; dK++) {
          dO[dM[dK]] = dN[dM[dK]];
        }
        return dO;
      }
      function cs() {
        dE(a2('ses'), '1', cE, bC, dm, b5, aR);
      }
      function br() {
        var dM = '';
        var dK =
          'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var dL = dK.length;
        var dJ;
        for (dJ = 0; dJ < 6; dJ++) {
          dM += dK.charAt(Math.floor(Math.random() * dL));
        }
        return dM;
      }
      function aI(dK) {
        if (cD !== '') {
          dK += cD;
          bs = true;
          return dK;
        }
        if (!h) {
          return dK;
        }
        var dL =
          typeof h.timing === 'object' && h.timing ? h.timing : undefined;
        if (!dL) {
          dL =
            typeof h.getEntriesByType === 'function' &&
            h.getEntriesByType('navigation')
              ? h.getEntriesByType('navigation')[0]
              : undefined;
        }
        if (!dL) {
          return dK;
        }
        var dJ = '';
        if (dL.connectEnd && dL.fetchStart) {
          if (dL.connectEnd < dL.fetchStart) {
            return dK;
          }
          dJ += '&pf_net=' + Math.round(dL.connectEnd - dL.fetchStart);
        }
        if (dL.responseStart && dL.requestStart) {
          if (dL.responseStart < dL.requestStart) {
            return dK;
          }
          dJ += '&pf_srv=' + Math.round(dL.responseStart - dL.requestStart);
        }
        if (dL.responseStart && dL.responseEnd) {
          if (dL.responseEnd < dL.responseStart) {
            return dK;
          }
          dJ += '&pf_tfr=' + Math.round(dL.responseEnd - dL.responseStart);
        }
        if (N(dL.domLoading)) {
          if (dL.domInteractive && dL.domLoading) {
            if (dL.domInteractive < dL.domLoading) {
              return dK;
            }
            dJ += '&pf_dm1=' + Math.round(dL.domInteractive - dL.domLoading);
          }
        } else {
          if (dL.domInteractive && dL.responseEnd) {
            if (dL.domInteractive < dL.responseEnd) {
              return dK;
            }
            dJ += '&pf_dm1=' + Math.round(dL.domInteractive - dL.responseEnd);
          }
        }
        if (dL.domComplete && dL.domInteractive) {
          if (dL.domComplete < dL.domInteractive) {
            return dK;
          }
          dJ += '&pf_dm2=' + Math.round(dL.domComplete - dL.domInteractive);
        }
        if (dL.loadEventEnd && dL.loadEventStart) {
          if (dL.loadEventEnd < dL.loadEventStart) {
            return dK;
          }
          dJ += '&pf_onl=' + Math.round(dL.loadEventEnd - dL.loadEventStart);
        }
        return dK + dJ;
      }
      function cr(dJ) {
        return (
          e(dJ, 'ignore_referrer') === '1' || e(dJ, 'ignore_referer') === '1'
        );
      }
      function dz() {
        var dT,
          dM = new Date(),
          dN = Math.round(dM.getTime() / 1000),
          dY,
          dL,
          dO = 1024,
          dV,
          dP,
          dK = a2('ses'),
          dS = a2('ref'),
          dR = aL(dK),
          dJ = bX(),
          dX = bf || bZ,
          dU,
          dQ,
          dW = {};
        dU = dJ[0];
        dQ = dJ[1];
        dY = dJ[2];
        dL = dJ[3];
        if (!cr(dX) && !dR) {
          if (!bI || !dU.length) {
            for (dT in cH) {
              if (Object.prototype.hasOwnProperty.call(cH, dT)) {
                dU = e(dX, cH[dT]);
                if (dU.length) {
                  break;
                }
              }
            }
            for (dT in bT) {
              if (Object.prototype.hasOwnProperty.call(bT, dT)) {
                dQ = e(dX, bT[dT]);
                if (dQ.length) {
                  break;
                }
              }
            }
          }
          dV = d(bA);
          dP = dL.length ? d(dL) : '';
          if (
            dV.length &&
            !a6(dV) &&
            !cJ(bA) &&
            (!bI || !dP.length || a6(dP) || cJ(dL))
          ) {
            dL = bA;
          }
          if (dL.length || dU.length) {
            dY = dN;
            dJ = [dU, dQ, dY, cf(dL.slice(0, dO))];
            dE(dS, X.JSON.stringify(dJ), dv, bC, dm, b5, aR);
          }
        }
        if (dU.length) {
          dW._rcn = u(dU);
        }
        if (dQ.length) {
          dW._rck = u(dQ);
        }
        dW._refts = dY;
        if (String(dL).length) {
          dW._ref = u(cf(dL.slice(0, dO)));
        }
        return dW;
      }
      function cL(dK, dW, dX) {
        var dV,
          dJ = new Date(),
          dU = aZ,
          dQ = a2('cvar'),
          dZ = bf || bZ,
          dL = cr(dZ);
        if (bx) {
          aN();
        }
        if (dd) {
          return '';
        }
        var dY = new RegExp('^file://', 'i');
        if (!cV && (X.location.protocol === 'file:' || dY.test(dZ))) {
          return '';
        }
        c5();
        var dR = a9();
        var dO = K.characterSet || K.charset;
        if (!dO || dO.toLowerCase() === 'utf-8') {
          dO = null;
        }
        dK +=
          '&idsite=' +
          cj +
          '&rec=1&r=' +
          String(Math.random()).slice(2, 8) +
          '&h=' +
          dJ.getHours() +
          '&m=' +
          dJ.getMinutes() +
          '&s=' +
          dJ.getSeconds() +
          '&url=' +
          u(cf(dZ)) +
          (bA.length && !cJ(bA) && !dL ? '&urlref=' + u(cf(bA)) : '') +
          (ad(bL) ? '&uid=' + u(bL) : '') +
          '&_id=' +
          dR.uuid +
          '&_idn=' +
          dR.newVisitor +
          (dO ? '&cs=' + u(dO) : '') +
          '&send_image=0';
        var dT = dz();
        for (dV in dT) {
          if (Object.prototype.hasOwnProperty.call(dT, dV)) {
            dK += '&' + dV + '=' + dT[dV];
          }
        }
        var d1 = [];
        if (dW) {
          for (dV in dW) {
            if (
              Object.prototype.hasOwnProperty.call(dW, dV) &&
              /^dimension\d+$/.test(dV)
            ) {
              var dM = dV.replace('dimension', '');
              d1.push(parseInt(dM, 10));
              d1.push(String(dM));
              dK += '&' + dV + '=' + u(dW[dV]);
              delete dW[dV];
            }
          }
        }
        if (dW && E(dW)) {
          dW = null;
        }
        for (dV in cN) {
          if (Object.prototype.hasOwnProperty.call(cN, dV)) {
            dK += '&' + dV + '=' + u(cN[dV]);
          }
        }
        for (dV in bz) {
          if (Object.prototype.hasOwnProperty.call(bz, dV)) {
            var dP = -1 === Q(d1, dV);
            if (dP) {
              dK += '&dimension' + dV + '=' + u(bz[dV]);
            }
          }
        }
        if (dW) {
          dK += '&data=' + u(X.JSON.stringify(dW));
        } else {
          if (aw) {
            dK += '&data=' + u(X.JSON.stringify(aw));
          }
        }
        function dN(d2, d3) {
          var d4 = X.JSON.stringify(d2);
          if (d4.length > 2) {
            return '&' + d3 + '=' + u(d4);
          }
          return '';
        }
        var d0 = dI(b9);
        var dS = dI(cC);
        dK += dN(d0, 'cvar');
        dK += dN(dS, 'e_cvar');
        if (aZ) {
          dK += dN(aZ, '_cvar');
          for (dV in dU) {
            if (Object.prototype.hasOwnProperty.call(dU, dV)) {
              if (aZ[dV][0] === '' || aZ[dV][1] === '') {
                delete aZ[dV];
              }
            }
          }
          if (b3) {
            dE(dQ, X.JSON.stringify(aZ), cE, bC, dm, b5, aR);
          }
        }
        if (bd && bR && !bs) {
          dK = aI(dK);
          bs = true;
        }
        if (aU) {
          dK += '&pv_id=' + aU;
        }
        aV(dR);
        cs();
        dK += ah(dX, { tracker: bV, request: dK });
        if (dp.length) {
          dK += '&' + dp;
        }
        if (au()) {
          dK += '&tracker_install_check=' + q;
        }
        if (D(cq)) {
          dK = cq(dK);
        }
        return dK;
      }
      b4 = function bi() {
        var dJ = new Date();
        dJ = dJ.getTime();
        if (!dn) {
          return false;
        }
        if (dn + bg <= dJ) {
          bV.ping();
          return true;
        }
        return false;
      };
      function bD(dM, dL, dQ, dN, dJ, dT) {
        var dP = 'idgoal=0',
          dK = new Date(),
          dR = [],
          dS,
          dO = String(dM).length;
        if (dO) {
          dP += '&ec_id=' + u(dM);
        }
        dP += '&revenue=' + dL;
        if (String(dQ).length) {
          dP += '&ec_st=' + dQ;
        }
        if (String(dN).length) {
          dP += '&ec_tx=' + dN;
        }
        if (String(dJ).length) {
          dP += '&ec_sh=' + dJ;
        }
        if (String(dT).length) {
          dP += '&ec_dt=' + dT;
        }
        if (dq) {
          for (dS in dq) {
            if (Object.prototype.hasOwnProperty.call(dq, dS)) {
              if (!N(dq[dS][1])) {
                dq[dS][1] = '';
              }
              if (!N(dq[dS][2])) {
                dq[dS][2] = '';
              }
              if (!N(dq[dS][3]) || String(dq[dS][3]).length === 0) {
                dq[dS][3] = 0;
              }
              if (!N(dq[dS][4]) || String(dq[dS][4]).length === 0) {
                dq[dS][4] = 1;
              }
              dR.push(dq[dS]);
            }
          }
          dP += '&ec_items=' + u(X.JSON.stringify(dR));
        }
        dP = cL(dP, aw, 'ecommerce');
        bS(dP, bW);
        if (dO) {
          dq = {};
        }
      }
      function cb(dJ, dN, dM, dL, dK, dO) {
        if (String(dJ).length && N(dN)) {
          bD(dJ, dN, dM, dL, dK, dO);
        }
      }
      function bF(dJ) {
        if (N(dJ)) {
          bD('', dJ, '', '', '', '');
        }
      }
      function cd(dK, dM, dL) {
        if (!bN) {
          aU = br();
        }
        var dJ = cL('action_name=' + u(aq(dK || bu)), dM, 'log');
        if (bd && !bs) {
          dJ = aI(dJ);
        }
        bS(dJ, bW, dL);
      }
      function bb(dL, dK) {
        var dM,
          dJ = '(^| )(piwik[_-]' + dK + '|matomo[_-]' + dK;
        if (dL) {
          for (dM = 0; dM < dL.length; dM++) {
            dJ += '|' + dL[dM];
          }
        }
        dJ += ')( |$)';
        return new RegExp(dJ);
      }
      function a4(dJ) {
        return aM && dJ && 0 === String(dJ).indexOf(aM);
      }
      function cP(dN, dJ, dO, dK) {
        if (a4(dJ)) {
          return 0;
        }
        var dM = bb(bY, 'download'),
          dL = bb(bj, 'link'),
          dP = new RegExp('\\.(' + dw.join('|') + ')([?&#]|$)', 'i');
        if (dL.test(dN)) {
          return 'link';
        }
        if (dK || dM.test(dN) || dP.test(dJ)) {
          return 'download';
        }
        if (dO) {
          return 0;
        }
        return 'link';
      }
      function aC(dK) {
        var dJ;
        dJ = dK.parentNode;
        while (dJ !== null && N(dJ)) {
          if (aj.isLinkElement(dK)) {
            break;
          }
          dK = dJ;
          dJ = dK.parentNode;
        }
        return dK;
      }
      function dC(dO) {
        dO = aC(dO);
        if (!aj.hasNodeAttribute(dO, 'href')) {
          return;
        }
        if (!N(dO.href)) {
          return;
        }
        var dN = aj.getAttributeValueFromNode(dO, 'href');
        var dK = dO.pathname || cB(dO.href);
        var dP = dO.hostname || d(dO.href);
        var dQ = dP.toLowerCase();
        var dL = dO.href.replace(dP, dQ);
        var dM = new RegExp(
          '^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto|tel):',
          'i'
        );
        if (!dM.test(dL)) {
          var dJ = cP(
            dO.className,
            dL,
            aA(dQ, dK),
            aj.hasNodeAttribute(dO, 'download')
          );
          if (dJ) {
            return { type: dJ, href: dL };
          }
        }
      }
      function aY(dJ, dK, dL, dM) {
        var dN = x.buildInteractionRequestParams(dJ, dK, dL, dM);
        if (!dN) {
          return;
        }
        return cL(dN, null, 'contentInteraction');
      }
      function bm(dJ, dK) {
        if (!dJ || !dK) {
          return false;
        }
        var dL = x.findTargetNode(dJ);
        if (x.shouldIgnoreInteraction(dL)) {
          return false;
        }
        dL = x.findTargetNodeNoDefault(dJ);
        if (dL && !Z(dL, dK)) {
          return false;
        }
        return true;
      }
      function cO(dL, dK, dN) {
        if (!dL) {
          return;
        }
        var dJ = x.findParentContentNode(dL);
        if (!dJ) {
          return;
        }
        if (!bm(dJ, dL)) {
          return;
        }
        var dM = x.buildContentBlock(dJ);
        if (!dM) {
          return;
        }
        if (!dM.target && dN) {
          dM.target = dN;
        }
        return x.buildInteractionRequestParams(
          dK,
          dM.name,
          dM.piece,
          dM.target
        );
      }
      function a7(dK) {
        if (!cp || !cp.length) {
          return false;
        }
        var dJ, dL;
        for (dJ = 0; dJ < cp.length; dJ++) {
          dL = cp[dJ];
          if (
            dL &&
            dL.name === dK.name &&
            dL.piece === dK.piece &&
            dL.target === dK.target
          ) {
            return true;
          }
        }
        return false;
      }
      function a8(dJ) {
        return function (dN) {
          if (!dJ) {
            return;
          }
          var dL = x.findParentContentNode(dJ);
          var dK;
          if (dN) {
            dK = dN.target || dN.srcElement;
          }
          if (!dK) {
            dK = dJ;
          }
          if (!bm(dL, dK)) {
            return;
          }
          if (!dL) {
            return false;
          }
          var dO = x.findTargetNode(dL);
          if (!dO || x.shouldIgnoreInteraction(dO)) {
            return false;
          }
          var dM = dC(dO);
          if (dy && dM && dM.type) {
            return dM.type;
          }
          return bV.trackContentInteractionNode(dK, 'click');
        };
      }
      function ce(dL) {
        if (!dL || !dL.length) {
          return;
        }
        var dJ, dK;
        for (dJ = 0; dJ < dL.length; dJ++) {
          dK = x.findTargetNode(dL[dJ]);
          if (dK && !dK.contentInteractionTrackingSetupDone) {
            dK.contentInteractionTrackingSetupDone = true;
            at(dK, 'click', a8(dK));
          }
        }
      }
      function bK(dL, dM) {
        if (!dL || !dL.length) {
          return [];
        }
        var dJ, dK;
        for (dJ = 0; dJ < dL.length; dJ++) {
          if (a7(dL[dJ])) {
            dL.splice(dJ, 1);
            dJ--;
          } else {
            cp.push(dL[dJ]);
          }
        }
        if (!dL || !dL.length) {
          return [];
        }
        ce(dM);
        var dN = [];
        for (dJ = 0; dJ < dL.length; dJ++) {
          dK = cL(
            x.buildImpressionRequestParams(
              dL[dJ].name,
              dL[dJ].piece,
              dL[dJ].target
            ),
            undefined,
            'contentImpressions'
          );
          if (dK) {
            dN.push(dK);
          }
        }
        return dN;
      }
      function cW(dK) {
        var dJ = x.collectContent(dK);
        return bK(dJ, dK);
      }
      function bk(dK) {
        if (!dK || !dK.length) {
          return [];
        }
        var dJ;
        for (dJ = 0; dJ < dK.length; dJ++) {
          if (!x.isNodeVisible(dK[dJ])) {
            dK.splice(dJ, 1);
            dJ--;
          }
        }
        if (!dK || !dK.length) {
          return [];
        }
        return cW(dK);
      }
      function aO(dL, dJ, dK) {
        var dM = x.buildImpressionRequestParams(dL, dJ, dK);
        return cL(dM, null, 'contentImpression');
      }
      function dB(dM, dK) {
        if (!dM) {
          return;
        }
        var dJ = x.findParentContentNode(dM);
        var dL = x.buildContentBlock(dJ);
        if (!dL) {
          return;
        }
        if (!dK) {
          dK = 'Unknown';
        }
        return aY(dK, dL.name, dL.piece, dL.target);
      }
      function dc(dK, dM, dJ, dL) {
        return (
          'e_c=' +
          u(dK) +
          '&e_a=' +
          u(dM) +
          (N(dJ) ? '&e_n=' + u(dJ) : '') +
          (N(dL) ? '&e_v=' + u(dL) : '') +
          '&ca=1'
        );
      }
      function aB(dL, dN, dJ, dM, dP, dO) {
        if (!ad(dL) || !ad(dN)) {
          ap(
            'Error while logging event: Parameters `category` and `action` must not be empty or filled with whitespaces'
          );
          return false;
        }
        var dK = cL(dc(dL, dN, dJ, dM), dP, 'event');
        bS(dK, bW, dO);
      }
      function cm(dJ, dM, dK, dN) {
        var dL = cL(
          'search=' +
            u(dJ) +
            (dM ? '&search_cat=' + u(dM) : '') +
            (N(dK) ? '&search_count=' + dK : ''),
          dN,
          'sitesearch'
        );
        bS(dL, bW);
      }
      function dg(dJ, dN, dM, dL) {
        var dK = cL('idgoal=' + dJ + (dN ? '&revenue=' + dN : ''), dM, 'goal');
        bS(dK, bW, dL);
      }
      function dr(dM, dJ, dQ, dP, dL) {
        var dO = dJ + '=' + u(cf(dM));
        var dK = cO(dL, 'click', dM);
        if (dK) {
          dO += '&' + dK;
        }
        var dN = cL(dO, dQ, 'link');
        bS(dN, bW, dP);
      }
      function b7(dK, dJ) {
        if (dK !== '') {
          return dK + dJ.charAt(0).toUpperCase() + dJ.slice(1);
        }
        return dJ;
      }
      function cw(dO) {
        var dN,
          dJ,
          dM = ['', 'webkit', 'ms', 'moz'],
          dL;
        if (!bp) {
          for (dJ = 0; dJ < dM.length; dJ++) {
            dL = dM[dJ];
            if (Object.prototype.hasOwnProperty.call(K, b7(dL, 'hidden'))) {
              if (K[b7(dL, 'visibilityState')] === 'prerender') {
                dN = true;
              }
              break;
            }
          }
        }
        if (dN) {
          at(K, dL + 'visibilitychange', function dK() {
            K.removeEventListener(dL + 'visibilitychange', dK, false);
            dO();
          });
          return;
        }
        dO();
      }
      function bE() {
        var dK = bV.getVisitorId();
        var dJ = aS();
        return dK + dJ;
      }
      function cz(dJ) {
        if (!dJ) {
          return;
        }
        if (!aj.hasNodeAttribute(dJ, 'href')) {
          return;
        }
        var dK = aj.getAttributeValueFromNode(dJ, 'href');
        if (!dK || a4(dK)) {
          return;
        }
        if (!bV.getVisitorId()) {
          return;
        }
        dK = j(dK, aD);
        var dL = bE();
        dK = J(dK, aD, dL);
        aj.setAnyAttribute(dJ, 'href', dK);
      }
      function bw(dM) {
        var dN = aj.getAttributeValueFromNode(dM, 'href');
        if (!dN) {
          return false;
        }
        dN = String(dN);
        var dK =
          dN.indexOf('//') === 0 ||
          dN.indexOf('http://') === 0 ||
          dN.indexOf('https://') === 0;
        if (!dK) {
          return false;
        }
        var dJ = dM.pathname || cB(dM.href);
        var dL = (dM.hostname || d(dM.href)).toLowerCase();
        if (aA(dL, dJ)) {
          if (!c4(dh, P(dL))) {
            return true;
          }
          return false;
        }
        return false;
      }
      function c3(dJ) {
        var dK = dC(dJ);
        if (dK && dK.type) {
          dK.href = p(dK.href);
          dr(dK.href, dK.type, undefined, null, dJ);
          return;
        }
        if (da) {
          dJ = aC(dJ);
          if (bw(dJ)) {
            cz(dJ);
          }
        }
      }
      function cQ() {
        return K.all && !K.addEventListener;
      }
      function di(dJ) {
        var dL = dJ.which;
        var dK = typeof dJ.button;
        if (!dL && dK !== 'undefined') {
          if (cQ()) {
            if (dJ.button & 1) {
              dL = 1;
            } else {
              if (dJ.button & 2) {
                dL = 3;
              } else {
                if (dJ.button & 4) {
                  dL = 2;
                }
              }
            }
          } else {
            if (dJ.button === 0 || dJ.button === '0') {
              dL = 1;
            } else {
              if (dJ.button & 1) {
                dL = 2;
              } else {
                if (dJ.button & 2) {
                  dL = 3;
                }
              }
            }
          }
        }
        return dL;
      }
      function b6(dJ) {
        switch (di(dJ)) {
          case 1:
            return 'left';
          case 2:
            return 'middle';
          case 3:
            return 'right';
        }
      }
      function bc(dJ) {
        return dJ.target || dJ.srcElement;
      }
      function dj(dJ) {
        return dJ === 'A' || dJ === 'AREA';
      }
      function aK(dJ) {
        function dK(dM) {
          var dN = bc(dM);
          var dO = dN.nodeName;
          var dL = bb(bM, 'ignore');
          while (!dj(dO) && dN && dN.parentNode) {
            dN = dN.parentNode;
            dO = dN.nodeName;
          }
          if (dN && dj(dO) && !dL.test(dN.className)) {
            return dN;
          }
        }
        return function (dN) {
          dN = dN || X.event;
          var dO = dK(dN);
          if (!dO) {
            return;
          }
          var dM = b6(dN);
          if (dN.type === 'click') {
            var dL = false;
            if (dJ && dM === 'middle') {
              dL = true;
            }
            if (dO && !dL) {
              c3(dO);
            }
          } else {
            if (dN.type === 'mousedown') {
              if (dM === 'middle' && dO) {
                a0 = dM;
                bO = dO;
              } else {
                a0 = bO = null;
              }
            } else {
              if (dN.type === 'mouseup') {
                if (dM === a0 && dO === bO) {
                  c3(dO);
                }
                a0 = bO = null;
              } else {
                if (dN.type === 'contextmenu') {
                  c3(dO);
                }
              }
            }
          }
        };
      }
      function az(dM, dL, dJ) {
        var dK = typeof dL;
        if (dK === 'undefined') {
          dL = true;
        }
        at(dM, 'click', aK(dL), dJ);
        if (dL) {
          at(dM, 'mouseup', aK(dL), dJ);
          at(dM, 'mousedown', aK(dL), dJ);
          at(dM, 'contextmenu', aK(dL), dJ);
        }
      }
      function a1(dK, dN, dO) {
        if (cu) {
          return true;
        }
        cu = true;
        var dP = false;
        var dM, dL;
        function dJ() {
          dP = true;
        }
        n(function () {
          function dQ(dS) {
            setTimeout(function () {
              if (!cu) {
                return;
              }
              dP = false;
              dO.trackVisibleContentImpressions();
              dQ(dS);
            }, dS);
          }
          function dR(dS) {
            setTimeout(function () {
              if (!cu) {
                return;
              }
              if (dP) {
                dP = false;
                dO.trackVisibleContentImpressions();
              }
              dR(dS);
            }, dS);
          }
          if (dK) {
            dM = ['scroll', 'resize'];
            for (dL = 0; dL < dM.length; dL++) {
              if (K.addEventListener) {
                K.addEventListener(dM[dL], dJ, false);
              } else {
                X.attachEvent('on' + dM[dL], dJ);
              }
            }
            dR(100);
          }
          if (dN && dN > 0) {
            dN = parseInt(dN, 10);
            dQ(dN);
          }
        });
      }
      var bQ = {
        enabled: true,
        requests: [],
        timeout: null,
        interval: 2500,
        sendRequests: function () {
          var dJ = this.requests;
          this.requests = [];
          if (dJ.length === 1) {
            bS(dJ[0], bW);
          } else {
            dF(dJ, bW);
          }
        },
        canQueue: function () {
          return !m && this.enabled;
        },
        pushMultiple: function (dK) {
          if (!this.canQueue()) {
            dF(dK, bW);
            return;
          }
          var dJ;
          for (dJ = 0; dJ < dK.length; dJ++) {
            this.push(dK[dJ]);
          }
        },
        push: function (dJ) {
          if (!dJ) {
            return;
          }
          if (!this.canQueue()) {
            bS(dJ, bW);
            return;
          }
          bQ.requests.push(dJ);
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          this.timeout = setTimeout(function () {
            bQ.timeout = null;
            bQ.sendRequests();
          }, bQ.interval);
          var dK = 'RequestQueue' + aF;
          if (!Object.prototype.hasOwnProperty.call(b, dK)) {
            b[dK] = {
              unload: function () {
                if (bQ.timeout) {
                  clearTimeout(bQ.timeout);
                }
                bQ.sendRequests();
              },
            };
          }
        },
      };
      bt();
      this.hasConsent = function () {
        return bP;
      };
      this.getVisitorInfo = function () {
        if (!aL(a2('id'))) {
          aV();
        }
        return db();
      };
      this.getVisitorId = function () {
        return this.getVisitorInfo()[1];
      };
      this.getAttributionInfo = function () {
        return bX();
      };
      this.getAttributionCampaignName = function () {
        return bX()[0];
      };
      this.getAttributionCampaignKeyword = function () {
        return bX()[1];
      };
      this.getAttributionReferrerTimestamp = function () {
        return bX()[2];
      };
      this.getAttributionReferrerUrl = function () {
        return bX()[3];
      };
      this.setTrackerUrl = function (dJ) {
        aM = dJ;
      };
      this.getTrackerUrl = function () {
        return aM;
      };
      this.getMatomoUrl = function () {
        return ab(this.getTrackerUrl(), bU);
      };
      this.getPiwikUrl = function () {
        return this.getMatomoUrl();
      };
      this.addTracker = function (dL, dK) {
        if (!N(dL) || null === dL) {
          dL = this.getTrackerUrl();
        }
        var dJ = new U(dL, dK);
        M.push(dJ);
        v.trigger('TrackerAdded', [this]);
        return dJ;
      };
      this.getSiteId = function () {
        return cj;
      };
      this.setSiteId = function (dJ) {
        cg(dJ);
      };
      this.resetUserId = function () {
        bL = '';
      };
      this.setUserId = function (dJ) {
        if (ad(dJ)) {
          bL = dJ;
        }
      };
      this.setVisitorId = function (dK) {
        var dJ = /[0-9A-Fa-f]{16}/g;
        if (y(dK) && dJ.test(dK)) {
          b0 = dK;
        } else {
          ap('Invalid visitorId set' + dK);
        }
      };
      this.getUserId = function () {
        return bL;
      };
      this.setCustomData = function (dJ, dK) {
        if (aa(dJ)) {
          aw = dJ;
        } else {
          if (!aw) {
            aw = {};
          }
          aw[dJ] = dK;
        }
      };
      this.getCustomData = function () {
        return aw;
      };
      this.setCustomRequestProcessing = function (dJ) {
        cq = dJ;
      };
      this.appendToTrackingUrl = function (dJ) {
        dp = dJ;
      };
      this.getRequest = function (dJ) {
        return cL(dJ);
      };
      this.addPlugin = function (dJ, dK) {
        b[dJ] = dK;
      };
      this.setCustomDimension = function (dJ, dK) {
        dJ = parseInt(dJ, 10);
        if (dJ > 0) {
          if (!N(dK)) {
            dK = '';
          }
          if (!y(dK)) {
            dK = String(dK);
          }
          bz[dJ] = dK;
        }
      };
      this.getCustomDimension = function (dJ) {
        dJ = parseInt(dJ, 10);
        if (dJ > 0 && Object.prototype.hasOwnProperty.call(bz, dJ)) {
          return bz[dJ];
        }
      };
      this.deleteCustomDimension = function (dJ) {
        dJ = parseInt(dJ, 10);
        if (dJ > 0) {
          delete bz[dJ];
        }
      };
      this.setCustomVariable = function (dK, dJ, dN, dL) {
        var dM;
        if (!N(dL)) {
          dL = 'visit';
        }
        if (!N(dJ)) {
          return;
        }
        if (!N(dN)) {
          dN = '';
        }
        if (dK > 0) {
          dJ = !y(dJ) ? String(dJ) : dJ;
          dN = !y(dN) ? String(dN) : dN;
          dM = [dJ.slice(0, bG), dN.slice(0, bG)];
          if (dL === 'visit' || dL === 2) {
            c2();
            aZ[dK] = dM;
          } else {
            if (dL === 'page' || dL === 3) {
              b9[dK] = dM;
            } else {
              if (dL === 'event') {
                cC[dK] = dM;
              }
            }
          }
        }
      };
      this.getCustomVariable = function (dK, dL) {
        var dJ;
        if (!N(dL)) {
          dL = 'visit';
        }
        if (dL === 'page' || dL === 3) {
          dJ = b9[dK];
        } else {
          if (dL === 'event') {
            dJ = cC[dK];
          } else {
            if (dL === 'visit' || dL === 2) {
              c2();
              dJ = aZ[dK];
            }
          }
        }
        if (!N(dJ) || (dJ && dJ[0] === '')) {
          return false;
        }
        return dJ;
      };
      this.deleteCustomVariable = function (dJ, dK) {
        if (this.getCustomVariable(dJ, dK)) {
          this.setCustomVariable(dJ, '', '', dK);
        }
      };
      this.deleteCustomVariables = function (dJ) {
        if (dJ === 'page' || dJ === 3) {
          b9 = {};
        } else {
          if (dJ === 'event') {
            cC = {};
          } else {
            if (dJ === 'visit' || dJ === 2) {
              aZ = {};
            }
          }
        }
      };
      this.storeCustomVariablesInCookie = function () {
        b3 = true;
      };
      this.setLinkTrackingTimer = function (dJ) {
        bW = dJ;
      };
      this.getLinkTrackingTimer = function () {
        return bW;
      };
      this.setDownloadExtensions = function (dJ) {
        if (y(dJ)) {
          dJ = dJ.split('|');
        }
        dw = dJ;
      };
      this.addDownloadExtensions = function (dK) {
        var dJ;
        if (y(dK)) {
          dK = dK.split('|');
        }
        for (dJ = 0; dJ < dK.length; dJ++) {
          dw.push(dK[dJ]);
        }
      };
      this.removeDownloadExtensions = function (dL) {
        var dK,
          dJ = [];
        if (y(dL)) {
          dL = dL.split('|');
        }
        for (dK = 0; dK < dw.length; dK++) {
          if (Q(dL, dw[dK]) === -1) {
            dJ.push(dw[dK]);
          }
        }
        dw = dJ;
      };
      this.setDomains = function (dJ) {
        aG = y(dJ) ? [dJ] : dJ;
        var dN = false,
          dL = 0,
          dK;
        for (dL; dL < aG.length; dL++) {
          dK = String(aG[dL]);
          if (c4(dh, P(dK))) {
            dN = true;
            break;
          }
          var dM = cB(dK);
          if (dM && dM !== '/' && dM !== '/*') {
            dN = true;
            break;
          }
        }
        if (!dN) {
          aG.push(dh);
        }
      };
      this.setExcludedReferrers = function (dJ) {
        cS = y(dJ) ? [dJ] : dJ;
      };
      this.enableCrossDomainLinking = function () {
        da = true;
      };
      this.disableCrossDomainLinking = function () {
        da = false;
      };
      this.isCrossDomainLinkingEnabled = function () {
        return da;
      };
      this.setCrossDomainLinkingTimeout = function (dJ) {
        ba = dJ;
      };
      this.getCrossDomainLinkingUrlParameter = function () {
        return u(aD) + '=' + u(bE());
      };
      this.setIgnoreClasses = function (dJ) {
        bM = y(dJ) ? [dJ] : dJ;
      };
      this.setRequestMethod = function (dJ) {
        if (dJ) {
          dA = String(dJ).toUpperCase();
        } else {
          dA = cx;
        }
        if (dA === 'GET') {
          this.disableAlwaysUseSendBeacon();
        }
      };
      this.setRequestContentType = function (dJ) {
        cR = dJ || aQ;
      };
      this.setGenerationTimeMs = function (dJ) {
        ap(
          'setGenerationTimeMs is no longer supported since Matomo 4. The call will be ignored. The replacement is setPagePerformanceTiming.'
        );
      };
      this.setPagePerformanceTiming = function (dN, dP, dO, dK, dQ, dL) {
        var dM = {
          pf_net: dN,
          pf_srv: dP,
          pf_tfr: dO,
          pf_dm1: dK,
          pf_dm2: dQ,
          pf_onl: dL,
        };
        try {
          dM = R(dM, N);
          dM = C(dM);
          cD = l(dM);
          if (cD === '') {
            ap(
              'setPagePerformanceTiming() called without parameters. This function needs to be called with at least one performance parameter.'
            );
            return;
          }
          bs = false;
          bR = true;
        } catch (dJ) {
          ap('setPagePerformanceTiming: ' + dJ.toString());
        }
      };
      this.setReferrerUrl = function (dJ) {
        bA = dJ;
      };
      this.setCustomUrl = function (dJ) {
        bf = b8(bZ, dJ);
      };
      this.getCurrentUrl = function () {
        return bf || bZ;
      };
      this.setDocumentTitle = function (dJ) {
        bu = dJ;
      };
      this.setPageViewId = function (dJ) {
        aU = dJ;
        bN = true;
      };
      this.getPageViewId = function () {
        return aU;
      };
      this.setAPIUrl = function (dJ) {
        bU = dJ;
      };
      this.setDownloadClasses = function (dJ) {
        bY = y(dJ) ? [dJ] : dJ;
      };
      this.setLinkClasses = function (dJ) {
        bj = y(dJ) ? [dJ] : dJ;
      };
      this.setCampaignNameKey = function (dJ) {
        cH = y(dJ) ? [dJ] : dJ;
      };
      this.setCampaignKeywordKey = function (dJ) {
        bT = y(dJ) ? [dJ] : dJ;
      };
      this.discardHashTag = function (dJ) {
        b1 = dJ;
      };
      this.setCookieNamePrefix = function (dJ) {
        bv = dJ;
        if (aZ) {
          aZ = ca();
        }
      };
      this.setCookieDomain = function (dJ) {
        var dK = P(dJ);
        if (!bx && !bJ(dK)) {
          ap("Can't write cookie on domain " + dJ);
        } else {
          dm = dK;
          bt();
        }
      };
      this.setExcludedQueryParams = function (dJ) {
        cy = y(dJ) ? [dJ] : dJ;
      };
      this.getCookieDomain = function () {
        return dm;
      };
      this.hasCookies = function () {
        return '1' === ci();
      };
      this.setSessionCookie = function (dL, dK, dJ) {
        if (!dL) {
          throw new Error('Missing cookie name');
        }
        if (!N(dJ)) {
          dJ = cE;
        }
        bH.push(dL);
        dE(a2(dL), dK, dJ, bC, dm, b5, aR);
      };
      this.getCookie = function (dK) {
        var dJ = aL(a2(dK));
        if (dJ === 0) {
          return null;
        }
        return dJ;
      };
      this.setCookiePath = function (dJ) {
        bC = dJ;
        bt();
      };
      this.getCookiePath = function () {
        return bC;
      };
      this.setVisitorCookieTimeout = function (dJ) {
        c7 = dJ * 1000;
      };
      this.setSessionCookieTimeout = function (dJ) {
        cE = dJ * 1000;
      };
      this.getSessionCookieTimeout = function () {
        return cE;
      };
      this.setReferralCookieTimeout = function (dJ) {
        dv = dJ * 1000;
      };
      this.setConversionAttributionFirstReferrer = function (dJ) {
        bI = dJ;
      };
      this.setSecureCookie = function (dJ) {
        if (dJ && location.protocol !== 'https:') {
          ap('Error in setSecureCookie: You cannot use `Secure` on http.');
          return;
        }
        b5 = dJ;
      };
      this.setCookieSameSite = function (dJ) {
        dJ = String(dJ);
        dJ = dJ.charAt(0).toUpperCase() + dJ.toLowerCase().slice(1);
        if (dJ !== 'None' && dJ !== 'Lax' && dJ !== 'Strict') {
          ap(
            'Ignored value for sameSite. Please use either Lax, None, or Strict.'
          );
          return;
        }
        if (dJ === 'None') {
          if (location.protocol === 'https:') {
            this.setSecureCookie(true);
          } else {
            ap(
              'sameSite=None cannot be used on http, reverted to sameSite=Lax.'
            );
            dJ = 'Lax';
          }
        }
        aR = dJ;
      };
      this.disableCookies = function () {
        bx = true;
        if (cj) {
          aN();
        }
      };
      this.areCookiesEnabled = function () {
        return !bx;
      };
      this.setCookieConsentGiven = function () {
        if (bx && !dd) {
          bx = false;
          if (!dl) {
            this.enableBrowserFeatureDetection();
          }
          if (cj && aE) {
            aV();
            var dJ = cL('ping=1', null, 'ping');
            bS(dJ, bW);
          }
        }
      };
      this.requireCookieConsent = function () {
        if (this.getRememberedCookieConsent()) {
          return false;
        }
        this.disableCookies();
        return true;
      };
      this.getRememberedCookieConsent = function () {
        return aL(c0);
      };
      this.forgetCookieConsentGiven = function () {
        cc(c0, bC, dm);
        this.disableCookies();
      };
      this.rememberCookieConsentGiven = function (dK) {
        if (dK) {
          dK = dK * 60 * 60 * 1000;
        } else {
          dK = 30 * 365 * 24 * 60 * 60 * 1000;
        }
        this.setCookieConsentGiven();
        var dJ = new Date().getTime();
        dE(c0, dJ, dK, bC, dm, b5, aR);
      };
      this.deleteCookies = function () {
        aN();
      };
      this.setDoNotTrack = function (dK) {
        var dJ = g.doNotTrack || g.msDoNotTrack;
        dd = dK && (dJ === 'yes' || dJ === '1');
        if (dd) {
          this.disableCookies();
        }
      };
      this.alwaysUseSendBeacon = function () {
        dk = true;
      };
      this.disableAlwaysUseSendBeacon = function () {
        dk = false;
      };
      this.addListener = function (dK, dJ) {
        az(dK, dJ, false);
      };
      this.enableLinkTracking = function (dK) {
        if (dy) {
          return;
        }
        dy = true;
        var dJ = this;
        r(function () {
          ax = true;
          var dL = K.body;
          az(dL, dK, true);
        });
      };
      this.enableJSErrorTracking = function () {
        if (df) {
          return;
        }
        df = true;
        var dJ = X.onerror;
        X.onerror = function (dO, dM, dL, dN, dK) {
          cw(function () {
            var dP = 'JavaScript Errors';
            var dQ = dM + ':' + dL;
            if (dN) {
              dQ += ':' + dN;
            }
            if (Q(cM, dP + dQ + dO) === -1) {
              cM.push(dP + dQ + dO);
              aB(dP, dQ, dO);
            }
          });
          if (dJ) {
            return dJ(dO, dM, dL, dN, dK);
          }
          return false;
        };
      };
      this.disablePerformanceTracking = function () {
        bd = false;
      };
      this.enableHeartBeatTimer = function (dJ) {
        dJ = Math.max(dJ || 15, 5);
        bg = dJ * 1000;
        if (dn !== null) {
          dH();
        }
      };
      this.disableHeartBeatTimer = function () {
        if (bg || aW) {
          if (X.removeEventListener) {
            X.removeEventListener('focus', bl);
            X.removeEventListener('blur', aH);
            X.removeEventListener('visibilitychange', a5);
          } else {
            if (X.detachEvent) {
              X.detachEvent('onfocus', bl);
              X.detachEvent('onblur', aH);
              X.detachEvent('visibilitychange', a5);
            }
          }
        }
        bg = null;
        aW = false;
      };
      this.killFrame = function () {
        if (X.location !== X.top.location) {
          X.top.location = X.location;
        }
      };
      this.redirectFile = function (dJ) {
        if (X.location.protocol === 'file:') {
          X.location = dJ;
        }
      };
      this.setCountPreRendered = function (dJ) {
        bp = dJ;
      };
      this.trackGoal = function (dJ, dM, dL, dK) {
        cw(function () {
          dg(dJ, dM, dL, dK);
        });
      };
      this.trackLink = function (dK, dJ, dM, dL) {
        cw(function () {
          dr(dK, dJ, dM, dL);
        });
      };
      this.getNumTrackedPageViews = function () {
        return cK;
      };
      this.trackPageView = function (dJ, dL, dK) {
        cp = [];
        c8 = [];
        cM = [];
        if (S(cj)) {
          cw(function () {
            ae(aM, bU, cj);
          });
        } else {
          cw(function () {
            cK++;
            cd(dJ, dL, dK);
          });
        }
      };
      this.disableBrowserFeatureDetection = function () {
        dl = false;
        dx = {};
        if (av()) {
          ay();
        }
      };
      this.enableBrowserFeatureDetection = function () {
        dl = true;
        c5();
      };
      this.trackAllContentImpressions = function () {
        if (S(cj)) {
          return;
        }
        cw(function () {
          r(function () {
            var dJ = x.findContentNodes();
            var dK = cW(dJ);
            bQ.pushMultiple(dK);
          });
        });
      };
      this.trackVisibleContentImpressions = function (dJ, dK) {
        if (S(cj)) {
          return;
        }
        if (!N(dJ)) {
          dJ = true;
        }
        if (!N(dK)) {
          dK = 750;
        }
        a1(dJ, dK, this);
        cw(function () {
          n(function () {
            var dL = x.findContentNodes();
            var dM = bk(dL);
            bQ.pushMultiple(dM);
          });
        });
      };
      this.trackContentImpression = function (dL, dJ, dK) {
        if (S(cj)) {
          return;
        }
        dL = a(dL);
        dJ = a(dJ);
        dK = a(dK);
        if (!dL) {
          return;
        }
        dJ = dJ || 'Unknown';
        cw(function () {
          var dM = aO(dL, dJ, dK);
          bQ.push(dM);
        });
      };
      this.trackContentImpressionsWithinNode = function (dJ) {
        if (S(cj) || !dJ) {
          return;
        }
        cw(function () {
          if (cu) {
            n(function () {
              var dK = x.findContentNodesWithinNode(dJ);
              var dL = bk(dK);
              bQ.pushMultiple(dL);
            });
          } else {
            r(function () {
              var dK = x.findContentNodesWithinNode(dJ);
              var dL = cW(dK);
              bQ.pushMultiple(dL);
            });
          }
        });
      };
      this.trackContentInteraction = function (dL, dM, dJ, dK) {
        if (S(cj)) {
          return;
        }
        dL = a(dL);
        dM = a(dM);
        dJ = a(dJ);
        dK = a(dK);
        if (!dL || !dM) {
          return;
        }
        dJ = dJ || 'Unknown';
        cw(function () {
          var dN = aY(dL, dM, dJ, dK);
          if (dN) {
            bQ.push(dN);
          }
        });
      };
      this.trackContentInteractionNode = function (dL, dK) {
        if (S(cj) || !dL) {
          return;
        }
        var dJ = null;
        cw(function () {
          dJ = dB(dL, dK);
          if (dJ) {
            bQ.push(dJ);
          }
        });
        return dJ;
      };
      this.logAllContentBlocksOnPage = function () {
        var dL = x.findContentNodes();
        var dJ = x.collectContent(dL);
        var dK = typeof console;
        if (dK !== 'undefined' && console && console.log) {
          console.log(dJ);
        }
      };
      this.trackEvent = function (dK, dM, dJ, dL, dO, dN) {
        cw(function () {
          aB(dK, dM, dJ, dL, dO, dN);
        });
      };
      this.trackSiteSearch = function (dJ, dL, dK, dM) {
        cp = [];
        cw(function () {
          cm(dJ, dL, dK, dM);
        });
      };
      this.setEcommerceView = function (dN, dJ, dL, dK) {
        cN = {};
        if (ad(dL)) {
          dL = String(dL);
        }
        if (!N(dL) || dL === null || dL === false || !dL.length) {
          dL = '';
        } else {
          if (dL instanceof Array) {
            dL = X.JSON.stringify(dL);
          }
        }
        var dM = '_pkc';
        cN[dM] = dL;
        if (N(dK) && dK !== null && dK !== false && String(dK).length) {
          dM = '_pkp';
          cN[dM] = dK;
        }
        if (!ad(dN) && !ad(dJ)) {
          return;
        }
        if (ad(dN)) {
          dM = '_pks';
          cN[dM] = dN;
        }
        if (!ad(dJ)) {
          dJ = '';
        }
        dM = '_pkn';
        cN[dM] = dJ;
      };
      this.getEcommerceItems = function () {
        return JSON.parse(JSON.stringify(dq));
      };
      this.addEcommerceItem = function (dN, dJ, dL, dK, dM) {
        if (ad(dN)) {
          dq[dN] = [String(dN), dJ, dL, dK, dM];
        }
      };
      this.removeEcommerceItem = function (dJ) {
        if (ad(dJ)) {
          dJ = String(dJ);
          delete dq[dJ];
        }
      };
      this.clearEcommerceCart = function () {
        dq = {};
      };
      this.trackEcommerceOrder = function (dJ, dN, dM, dL, dK, dO) {
        cb(dJ, dN, dM, dL, dK, dO);
      };
      this.trackEcommerceCartUpdate = function (dJ) {
        bF(dJ);
      };
      this.trackRequest = function (dK, dM, dL, dJ) {
        cw(function () {
          var dN = cL(dK, dM, dJ);
          bS(dN, bW, dL);
        });
      };
      this.ping = function () {
        this.trackRequest('ping=1', null, null, 'ping');
      };
      this.disableQueueRequest = function () {
        bQ.enabled = false;
      };
      this.setRequestQueueInterval = function (dJ) {
        if (dJ < 1000) {
          throw new Error('Request queue interval needs to be at least 1000ms');
        }
        bQ.interval = dJ;
      };
      this.queueRequest = function (dK, dJ) {
        cw(function () {
          var dL = dJ ? dK : cL(dK);
          bQ.push(dL);
        });
      };
      this.isConsentRequired = function () {
        return cX;
      };
      this.getRememberedConsent = function () {
        var dJ = aL(bo);
        if (aL(c9)) {
          if (dJ) {
            cc(bo, bC, dm);
          }
          return null;
        }
        if (!dJ || dJ === 0) {
          return null;
        }
        return dJ;
      };
      this.hasRememberedConsent = function () {
        return !!this.getRememberedConsent();
      };
      this.requireConsent = function () {
        cX = true;
        bP = this.hasRememberedConsent();
        if (!bP) {
          bx = true;
        }
        z++;
        b['CoreConsent' + z] = {
          unload: function () {
            if (!bP) {
              aN();
            }
          },
        };
      };
      this.setConsentGiven = function (dK) {
        bP = true;
        if (!dl) {
          this.enableBrowserFeatureDetection();
        }
        cc(c9, bC, dm);
        var dL, dJ;
        for (dL = 0; dL < c8.length; dL++) {
          dJ = typeof c8[dL][0];
          if (dJ === 'string') {
            bS(c8[dL][0], bW, c8[dL][1]);
          } else {
            if (dJ === 'object') {
              dF(c8[dL][0], bW);
            }
          }
        }
        c8 = [];
        if (!N(dK) || dK) {
          this.setCookieConsentGiven();
        }
      };
      this.rememberConsentGiven = function (dL) {
        if (dL) {
          dL = dL * 60 * 60 * 1000;
        } else {
          dL = 30 * 365 * 24 * 60 * 60 * 1000;
        }
        var dJ = true;
        this.setConsentGiven(dJ);
        var dK = new Date().getTime();
        dE(bo, dK, dL, bC, dm, b5, aR);
      };
      this.forgetConsentGiven = function (dJ) {
        if (dJ) {
          dJ = dJ * 60 * 60 * 1000;
        } else {
          dJ = 30 * 365 * 24 * 60 * 60 * 1000;
        }
        cc(bo, bC, dm);
        dE(c9, new Date().getTime(), dJ, bC, dm, b5, aR);
        this.forgetCookieConsentGiven();
        this.requireConsent();
      };
      this.isUserOptedOut = function () {
        return !bP;
      };
      this.optUserOut = this.forgetConsentGiven;
      this.forgetUserOptOut = function () {
        this.setConsentGiven(false);
      };
      this.enableFileTracking = function () {
        cV = true;
      };
      n(function () {
        setTimeout(function () {
          bR = true;
        }, 0);
      });
      v.trigger('TrackerSetup', [this]);
      v.addPlugin('TrackerVisitorIdCookie' + aF, {
        unload: function () {
          if (av() && !by) {
            by = true;
            ay();
          }
          if (!aE) {
            aV();
            dz();
          }
        },
      });
    }
    function L() {
      return { push: ak };
    }
    function c(az, ay) {
      var aA = {};
      var aw, ax;
      for (aw = 0; aw < ay.length; aw++) {
        var au = ay[aw];
        aA[au] = 1;
        for (ax = 0; ax < az.length; ax++) {
          if (az[ax] && az[ax][0]) {
            var av = az[ax][0];
            if (au === av) {
              ak(az[ax]);
              delete az[ax];
              if (
                aA[av] > 1 &&
                av !== 'addTracker' &&
                av !== 'enableLinkTracking'
              ) {
                ap(
                  'The method ' +
                    av +
                    ' is registered more than once in "_paq" variable. Only the last call has an effect. Please have a look at the multiple Matomo trackers documentation: https://developer.matomo.org/guides/tracking-javascript-guide#multiple-piwik-trackers'
                );
              }
              aA[av]++;
            }
          }
        }
      }
      return az;
    }
    var F = [
      'addTracker',
      'enableFileTracking',
      'forgetCookieConsentGiven',
      'requireCookieConsent',
      'disableBrowserFeatureDetection',
      'disableCookies',
      'setTrackerUrl',
      'setAPIUrl',
      'enableCrossDomainLinking',
      'setCrossDomainLinkingTimeout',
      'setSessionCookieTimeout',
      'setVisitorCookieTimeout',
      'setCookieNamePrefix',
      'setCookieSameSite',
      'setSecureCookie',
      'setCookiePath',
      'setCookieDomain',
      'setDomains',
      'setUserId',
      'setVisitorId',
      'setSiteId',
      'alwaysUseSendBeacon',
      'disableAlwaysUseSendBeacon',
      'enableLinkTracking',
      'setCookieConsentGiven',
      'requireConsent',
      'setConsentGiven',
      'disablePerformanceTracking',
      'setPagePerformanceTiming',
      'setExcludedQueryParams',
      'setExcludedReferrers',
    ];
    function ai(aw, av) {
      var au = new U(aw, av);
      M.push(au);
      _paq = c(_paq, F);
      for (I = 0; I < _paq.length; I++) {
        if (_paq[I]) {
          ak(_paq[I]);
        }
      }
      _paq = new L();
      v.trigger('TrackerAdded', [au]);
      return au;
    }
    at(X, 'beforeunload', an, false);
    at(
      X,
      'visibilitychange',
      function () {
        if (m) {
          return;
        }
        if (K.visibilityState === 'hidden') {
          ah('unload');
        }
      },
      false
    );
    at(
      X,
      'online',
      function () {
        if (N(g.serviceWorker)) {
          g.serviceWorker.ready.then(
            function (au) {
              if (au && au.sync) {
                return au.sync.register('matomoSync');
              }
            },
            function () {}
          );
        }
      },
      false
    );
    at(
      X,
      'message',
      function (az) {
        if (!az || !az.origin) {
          return;
        }
        var aB, ax, av;
        var aC = d(az.origin);
        var ay = v.getAsyncTrackers();
        for (ax = 0; ax < ay.length; ax++) {
          av = d(ay[ax].getMatomoUrl());
          if (av === aC) {
            aB = ay[ax];
            break;
          }
        }
        if (!aB) {
          return;
        }
        var aw = null;
        try {
          aw = JSON.parse(az.data);
        } catch (aA) {
          return;
        }
        if (!aw) {
          return;
        }
        function au(aF) {
          var aH = K.getElementsByTagName('iframe');
          for (ax = 0; ax < aH.length; ax++) {
            var aG = aH[ax];
            var aD = d(aG.src);
            if (
              aG.contentWindow &&
              N(aG.contentWindow.postMessage) &&
              aD === aC
            ) {
              var aE = JSON.stringify(aF);
              aG.contentWindow.postMessage(aE, az.origin);
            }
          }
        }
        if (N(aw.maq_initial_value)) {
          au({
            maq_opted_in: aw.maq_initial_value && aB.hasConsent(),
            maq_url: aB.getMatomoUrl(),
            maq_optout_by_default: aB.isConsentRequired(),
          });
        } else {
          if (N(aw.maq_opted_in)) {
            ay = v.getAsyncTrackers();
            for (ax = 0; ax < ay.length; ax++) {
              aB = ay[ax];
              if (aw.maq_opted_in) {
                aB.rememberConsentGiven();
              } else {
                aB.forgetConsentGiven();
              }
            }
            au({
              maq_confirm_opted_in: aB.hasConsent(),
              maq_url: aB.getMatomoUrl(),
              maq_optout_by_default: aB.isConsentRequired(),
            });
          }
        }
      },
      false
    );
    Date.prototype.getTimeAlias = Date.prototype.getTime;
    v = {
      initialized: false,
      JSON: X.JSON,
      DOM: {
        addEventListener: function (ax, aw, av, au) {
          var ay = typeof au;
          if (ay === 'undefined') {
            au = false;
          }
          at(ax, aw, av, au);
        },
        onLoad: n,
        onReady: r,
        isNodeVisible: i,
        isOrWasNodeVisible: x.isNodeVisible,
      },
      on: function (av, au) {
        if (!A[av]) {
          A[av] = [];
        }
        A[av].push(au);
      },
      off: function (aw, av) {
        if (!A[aw]) {
          return;
        }
        var au = 0;
        for (au; au < A[aw].length; au++) {
          if (A[aw][au] === av) {
            A[aw].splice(au, 1);
          }
        }
      },
      trigger: function (aw, ax, av) {
        if (!A[aw]) {
          return;
        }
        var au = 0;
        for (au; au < A[aw].length; au++) {
          A[aw][au].apply(av || X, ax);
        }
      },
      addPlugin: function (au, av) {
        b[au] = av;
      },
      getTracker: function (av, au) {
        if (!N(au)) {
          au = this.getAsyncTracker().getSiteId();
        }
        if (!N(av)) {
          av = this.getAsyncTracker().getTrackerUrl();
        }
        return new U(av, au);
      },
      getAsyncTrackers: function () {
        return M;
      },
      addTracker: function (aw, av) {
        var au;
        if (!M.length) {
          au = ai(aw, av);
        } else {
          au = M[0].addTracker(aw, av);
        }
        return au;
      },
      getAsyncTracker: function (ay, ax) {
        var aw;
        if (M && M.length && M[0]) {
          aw = M[0];
        } else {
          return ai(ay, ax);
        }
        if (!ax && !ay) {
          return aw;
        }
        if ((!N(ax) || null === ax) && aw) {
          ax = aw.getSiteId();
        }
        if ((!N(ay) || null === ay) && aw) {
          ay = aw.getTrackerUrl();
        }
        var av,
          au = 0;
        for (au; au < M.length; au++) {
          av = M[au];
          if (
            av &&
            String(av.getSiteId()) === String(ax) &&
            av.getTrackerUrl() === ay
          ) {
            return av;
          }
        }
      },
      retryMissedPluginCalls: function () {
        var av = am;
        am = [];
        var au = 0;
        for (au; au < av.length; au++) {
          ak(av[au]);
        }
      },
    };
    if (typeof define === 'function' && define.amd) {
      define('piwik', [], function () {
        return v;
      });
      define('matomo', [], function () {
        return v;
      });
    }
    return v;
  })();
}
/*!!! pluginTrackerHook */
(function () {
  function b() {
    if ('object' !== typeof _paq) {
      return false;
    }
    var c = typeof _paq.length;
    if ('undefined' === c) {
      return false;
    }
    return !!_paq.length;
  }
  if (
    window &&
    'object' === typeof window.matomoPluginAsyncInit &&
    window.matomoPluginAsyncInit.length
  ) {
    var a = 0;
    for (a; a < window.matomoPluginAsyncInit.length; a++) {
      if (typeof window.matomoPluginAsyncInit[a] === 'function') {
        window.matomoPluginAsyncInit[a]();
      }
    }
  }
  if (window && window.piwikAsyncInit) {
    window.piwikAsyncInit();
  }
  if (window && window.matomoAsyncInit) {
    window.matomoAsyncInit();
  }
  if (!window.Matomo.getAsyncTrackers().length) {
    if (b()) {
      window.Matomo.addTracker();
    } else {
      _paq = {
        push: function (c) {
          var d = typeof console;
          if (d !== 'undefined' && console && console.error) {
            console.error(
              '_paq.push() was used but Matomo tracker was not initialized before the matomo.js file was loaded. Make sure to configure the tracker via _paq.push before loading matomo.js. Alternatively, you can create a tracker via Matomo.addTracker() manually and then use _paq.push but it may not fully work as tracker methods may not be executed in the correct order.',
              c
            );
          }
        },
      };
    }
  }
  window.Matomo.trigger('MatomoInitialized', []);
  window.Matomo.initialized = true;
})();
(function () {
  var a = typeof window.AnalyticsTracker;
  if (a === 'undefined') {
    window.AnalyticsTracker = window.Matomo;
  }
})();
if (typeof window.piwik_log !== 'function') {
  window.piwik_log = function (c, e, g, f) {
    function b(h) {
      try {
        if (window['piwik_' + h]) {
          return window['piwik_' + h];
        }
      } catch (i) {}
      return;
    }
    var d,
      a = window.Matomo.getTracker(g, e);
    a.setDocumentTitle(c);
    a.setCustomData(f);
    d = b('tracker_pause');
    if (d) {
      a.setLinkTrackingTimer(d);
    }
    d = b('download_extensions');
    if (d) {
      a.setDownloadExtensions(d);
    }
    d = b('hosts_alias');
    if (d) {
      a.setDomains(d);
    }
    d = b('ignore_classes');
    if (d) {
      a.setIgnoreClasses(d);
    }
    a.trackPageView();
    if (b('install_tracker')) {
      piwik_track = function (i, j, k, h) {
        a.setSiteId(j);
        a.setTrackerUrl(k);
        a.trackLink(i, h);
      };
      a.enableLinkTracking();
    }
  };
}
/*!! @license-end */
