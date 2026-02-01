#include <jni.h>
#include "nitrodownloaderOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::nitrodownloader::initialize(vm);
}
