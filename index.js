'use strict';

function checkMap(config, caller, importing, root) {
  let result = null;
  if (config.map) {
    Object.keys(config.map).forEach((key) => {
      if (`${key}.js` === caller) {
        Object.keys(config.map[key]).forEach((keyFile) => {
          if (config.map[key][keyFile].indexOf(importing) !== -1) {
            result = config.baseUrl
              ? `${root}/${config.baseUrl}/${config.map[key][keyFile]}.js`
              : `${root}/${config.map[key][keyFile]}.js`;
          }
        });
      } else if ((`${key}.js` === '*') && !result) {
        Object.keys(config.map[key]).forEach((keyFile) => {
          if (config.map[key][keyFile].indexOf(importing) !== -1) {
            result = config.baseUrl
              ? `${root}/${config.baseUrl}/${config.map[key][keyFile]}.js`
              : `${root}/${config.map[key][keyFile]}.js`;
          }
        });
      }
    });
  }
  return result;
}

function checkBundles(config, importing, prevResult, root) {
  let result = null;
  if (config.bundles && !prevResult) {
    Object.keys(config.bundles).forEach((key) => {
      if (config.bundles[key].indexOf(importing) !== -1) {
        result = config.baseUrl ? `${root}/${config.baseUrl}/${key}.js` : `${root}/${key}.js`;
      }
    });
  }
  return result || prevResult;
}

function checkRootDirPath(importing, root, prevResult) {
  let result = null;
  if (importing.startsWith('/') && !prevResult) {
    result = `${importing}`;
  } else if (importing.endsWith('.js') && !prevResult) {
    result = `${root}/${importing}`;
  }
  return result || prevResult;
}

function checkEmptyConfig(config, importing, root, prevResult) {
  let result = null;
  if (!config.baseUrl && !config.paths && !prevResult) {
    result = `${root}/${importing}.js`;
  }
  return result || prevResult;
}

function checkRootPaths(config, importing, root, prevResult) {
  let result = null;
  if (config.paths && (config.paths[importing] === `../${importing}`) && !prevResult) { // todo: check
    result = `${root}/${importing}.js`;
  }
  return result || prevResult;
}

function checkBaseUrlOnly(config, importing, root, prevResult) {
  let result = null;
  if (config.baseUrl && !config.paths && !prevResult) {
    result = `${root}/${config.baseUrl}/${importing}.js`;
  }
  return result || prevResult;
}

function checkPathsOnly(config, importing, root, prevResult) {
  let result = null;
  if ((!config.baseUrl) && config.paths && config.paths[importing] && !prevResult) {
    result = `${root}/${config.paths[importing]}.js`;
  }
  return result || prevResult;
}

function checkFullPath(config, importing, root, prevResult) {
  let result = null;
  if ((config.baseUrl) && config.paths && config.paths[importing] && !prevResult) {
    result = `${root}/${config.baseUrl}/${config.paths[importing]}.js`;
  }
  return result || prevResult;
}

function resolveFile(config, caller, importing, root) {
  let result;
  result = checkMap(config, caller, importing, root);
  result = checkBundles(config, importing, result, root);
  result = checkRootDirPath(importing, root, result);
  result = checkEmptyConfig(config, importing, root, result);
  result = checkRootPaths(config, importing, root, result);
  result = checkBaseUrlOnly(config, importing, root, result);
  result = checkPathsOnly(config, importing, root, result);
  result = checkFullPath(config, importing, root, result);
  return result;
}

module.exports = {};
module.exports.resolve = resolveFile;
