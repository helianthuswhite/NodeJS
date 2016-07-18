
// 一般来说，尽量使用工厂模式来创建对象而不是直接使用new
// var obj = addon.createObject();
// instead of:
// var obj = new addon.Object();

// CreateObject方法是在addon.cc中执行的

// addon.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  MyObject::NewInstance(args);
}

void InitAll(Local<Object> exports, Local<Object> module) {
  MyObject::Init(exports->GetIsolate());

  NODE_SET_METHOD(module, "exports", CreateObject);
}

NODE_MODULE(addon, InitAll)

}  // namespace demo

// 静态方法NewInstance替代了JS中的new来实例化对象

// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include <node_object_wrap.h>

namespace demo {

class MyObject : public node::ObjectWrap {
 public:
  static void Init(v8::Isolate* isolate);
  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Persistent<v8::Function> constructor;
  double value_;
};

}  // namespace demo

#endif

//myobject.cc 这里跟前面一样的，就没有贴出来

// // test.js
// const createObject = require('./build/Release/addon');

// var obj = createObject(10);
// console.log(obj.plusOne()); // 11
// console.log(obj.plusOne()); // 12
// console.log(obj.plusOne()); // 13

// var obj2 = createObject(20);
// console.log(obj2.plusOne()); // 21
// console.log(obj2.plusOne()); // 22
// console.log(obj2.plusOne()); // 23
