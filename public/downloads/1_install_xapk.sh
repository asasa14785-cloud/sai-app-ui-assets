#!/usr/bin/env bash
# تثبيت Say 1.0.4 (XAPK) على جهاز/محاكي أندرويد متصل بـ adb (أندرويد 7.0+ ، arm64 للأجهزة الحقيقية أو محاكي ARM64 / Google Play image)
# الاستخدام:  ./1_install_xapk.sh say_com.moments.expenses_1.0.4.xapk
set -e
X="${1:?path to .xapk}"
T=$(mktemp -d); unzip -q "$X" -d "$T"
adb install-multiple -r "$T"/com.moments.expenses.apk "$T"/config.*.apk
adb shell monkey -p com.moments.expenses -c android.intent.category.LAUNCHER 1
echo "Installed. Log in, then run 2_record_flows.sh"
