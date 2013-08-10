// JavaScript Document

'use strict';

function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function toSearchString(query) {
  var result = [];
  
  for (key in query) {
    result [result.length]= encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
  }

  return ((result instanceof Array)? result.join('&'): '');    
}

toSearchString({}); // ''
toSearchString({test: true}); // 'test=true'
toSearchString({num: 10, test: true}); // 'num=10&test=true'
toSearchString({num: 10, test: true, user: 'admin'}); // 'num=10&test=true&user=admin'


//------------------------------------------------------------------------------
function flatten_full(arr) {
  function flatten_tree(arr) {
    var tmp_res = '';
  
    if (isArray(arr)) {
      if (arr.length === 0) {
        result[result.length] = '[]';
      }
      else {
        for (var i=0; i<arr.length; ++i) {
          flatten_tree(arr[i]);
        }
      }
    }
    else if (isObject(arr)) {
      result[result.length] = '{}';
    }
    else {
      result[result.length] = arr;
    }
  }
  
  
  var result = [];
  
  if (arr.length === 0) {
    return '[]';
  }
    
  flatten2(arr);
  
  return '[' + result.join(', ') + ']';
}



function flatten(arr) {
  function toString(obj) {
    var result = '';
    var tmp_res = [];
    
    if (isArray(obj)) {
      for (var i=0; i<obj.length; ++i) {
        tmp_res[tmp_res.length] = toString(obj[i]);
      }
      result = '[' + tmp_res.join(', ') + ']';
    }
    else if (isObject(obj)) {
      for (key in obj) {
        tmp_res[tmp_res.length] = key + ': ' + toString(obj[key]) 
      }
      result = '{' + tmp_res.join(', ') + '}';
    }
    else {
      result = obj 
    }
    
    return result;
  }

  var result = [];
  for (var i=0; i<arr.length; ++i) {
    if (isArray(arr[i])) {
      var val = arr[i];
      if (val.length === 0) {
        result[result.length] = '[]';
        continue;
      }
      for (var j=0; j<val.length; ++j) {
        result[result.length] = toString(val[j]);
      }
    }
    else if (isObject(arr[i])) {
      result[result.length] = toString(arr[i]);
    }
    else {
      result[result.length] = arr[i];
    }
  }
  return '[' + result.join(', ') + ']';
}
flatten([[1], 1, 1]); // [1, 1, 1]
flatten([[[1]], 1]); // [[1], 1]
flatten([[[1]], 1]); // [[1], 1]
flatten([]); // []
flatten([{}]); // [{}]
flatten([[{}], []]); // [{}, []]


//------------------------------------------------------------------------------
function toMatrix(arr, cols) {
  var result = [];

  if (cols <= 0) {
    return [];
  }

  var row = 0;
  for(var i=0; i<arr.length; ++i) {
    if (!isArray(result[row])) {
      result[row] = [];
    }
    result[row][i % cols] = arr[i];
    
    if ((i+1) % cols === 0) {
      ++row;
    } 
  }
  
  return result;
}

toMatrix([1,2,3,4,5,6,7,8,9], 3); // [[1,2,3], [4,5,6], [7,8,9]]
toMatrix([1,2,3,4,5,6,7], 3); // [[1,2,3], [4,5,6], [7]]
toMatrix([1,2,3], 5); // [[1,2,3]]
toMatrix([], 3); // []



//------------------------------------------------------------------------------
function createObject(keys, values) {
  var res_obj = {};
  
  for(var i=0; i<keys.length; ++i) {
    res_obj[keys[i]] = values[i];
  }
  
  return res_obj;
}

createObject(['name', 'age'], ['Vasiliy', 45]); // {name: 'Vasiliy', age: '45'}
createObject(['name', 'age'], ['Vasiliy']); // {name: 'Vasiliy', age: undefined}
createObject(['name'], ['Vasiliy', 45]); // {name: 'Vasiliy'}
createObject([], []); // {}



//------------------------------------------------------------------------------

function contains(arr1, arr2) {
  return arr1.join('|').indexOf(arr2.join('|')) > -1;
}
contains([1,2,3,4,5,6,7,8,9], [1,2]); // true
contains([1,2,3,4,5,6,7,8,9], [1,2]); // true
contains([1,2,3,4,5,6,7,8,9], []); // true
contains([1,2,3,4,5,6,7,8,9], [0]); // false
contains([], [0]); // false
contains([], []); // true
contains([1], [1]); // true