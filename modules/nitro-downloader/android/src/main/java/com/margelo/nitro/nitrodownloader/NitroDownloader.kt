package com.margelo.nitro.nitrodownloader
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class NitroDownloader : HybridNitroDownloaderSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
