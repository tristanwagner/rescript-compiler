// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


async function topLevelAsyncFunction(param) {
  for(let innerScopeVal = 0; innerScopeVal <= 3; ++innerScopeVal){
    let asyncClosureAccessingScopedVal = await(async function(innerScopeVal){
    return async function asyncClosureAccessingScopedVal(param) {
      console.log("Accessing scoped var inside loop", innerScopeVal);
      return await Promise.resolve();
    }
    }(innerScopeVal));
    await asyncClosureAccessingScopedVal();
  }
}

topLevelAsyncFunction();

exports.topLevelAsyncFunction = topLevelAsyncFunction;
/*  Not a pure module */
