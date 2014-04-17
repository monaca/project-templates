<?php

#
# find -type d -maxdepth 1 | grep -v misc | xargs -n 1 php convert.php
#

$curdir = $_SERVER["argv"][1];
$curdir = getcwd() . "/" . rtrim($curdir, "/");
if (!is_dir($curdir)) {
  echo "Please specify directory";
}

$newdir = $curdir . "_new";

// ディレクトリ削除、作成しなおし
exec("rm -rf $newdir");
makedir($newdir);
chdir($newdir);

// 必要なディレクトリを作成
makedir(".monaca");
makedir("merges/android");
makedir("merges/ios");
makedir("merges/winrt");
makedir("merges/firefoxos");
makedir("merges/winrt");
makedir("platforms/android");
makedir("platforms/android/res/drawable");
makedir("platforms/android/res/drawable-hdpi");
makedir("platforms/android/res/drawable-ldpi");
makedir("platforms/android/res/drawable-mdpi");
makedir("platforms/android/res/drawable-xhdpi");
makedir("platforms/android/res/drawable-xxhdpi");
makedir("platforms/ios");
makedir("platforms/ios/MonacaApp/Resources/icons");
makedir("platforms/ios/MonacaApp/Resources/splash");
makedir("platforms/winrt");
makedir("platforms/firefoxos");
makedir("platforms/winrt");
makedir("plugins");
makedir("www");

// コピー
chdir($curdir);
$copy = [
  "project_info.json" => ".monaca/project_info.json",
  "android/res/" => "platforms/android/res/",
  "assets/android/AndroidManifest.xml" => "platforms/android/AndroidManifest.xml",
  "assets/android/config.xml" => "platforms/android/config.xml",
  "assets/android/splash_default.png" => "platforms/android/splash_default.png",
  "assets/iOS/config.xml" => "platforms/ios/config.xml",
  "assets/iOS/MonacaSkeleton-Info.plist" => "platforms/ios/MonacaApp-Info.plist",
  "assets/www/" => "www/",
  "iOS/MonacaSkeleton/Icon*" => "platforms/ios/MonacaApp/Resources/icons/",
  "iOS/MonacaSkeleton/Default*" => "platforms/ios/MonacaApp/Resources/splash/",
  "winrt/*.png" => "platforms/winrt/",
];
foreach ($copy as $from => $to) {
  $command = "rsync -a $curdir/$from $newdir/$to 2>&1";
  #echo $command . "\n";
  passthru($command);
}
exec("mv $curdir ${curdir}_old");
exec("mv $newdir ${curdir}");

function makedir($dir) {
  echo "Mkdir $dir\n";
  @mkdir($dir, 0777, true);
}
