#!/usr/bin/env bash
# يسجّل كل تدفّق (Flow) كفيديو MP4 بدقة الجهاز الأصلية + لقطات PNG عند الطلب.
# عدّل قائمة FLOWS ثم شغّل. أثناء كل تسجيل نفّذ الخطوات يدويًا على الجهاز (أو بـ adb shell input tap/swipe).
OUT=./captured; mkdir -p "$OUT"
FLOWS=(01_splash_onboarding 02_signin 03_signup_verify_email 04_currency_selection 05_home_empty 06_voice_record_processing
       07_add_expense_manual_category 08_edit_expense_modal 09_swipe_delete_expense 10_set_budget 11_weekly_reports_list
       12_weekly_report_stories 13_report_cooking_modal 14_settings 15_paywall 16_not_found)
# اجعل الواجهة نظيفة: وضع العرض التوضيحي لشريط الحالة (9:41 وبطارية كاملة)
adb shell settings put global sysui_demo_allowed 1
adb shell am broadcast -a com.android.systemui.demo -e command enter >/dev/null
adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 0941 >/dev/null
adb shell am broadcast -a com.android.systemui.demo -e command battery -e level 100 -e plugged false >/dev/null
adb shell am broadcast -a com.android.systemui.demo -e command network -e wifi show -e level 4 >/dev/null
adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false >/dev/null
for f in "${FLOWS[@]}"; do
  read -p "▶ [$f] اضغط Enter لبدء التسجيل (Ctrl+C للخروج)"
  adb shell "screenrecord --bit-rate 24000000 --time-limit 180 /sdcard/$f.mp4" & PID=$!
  read -p "   ⏹ اضغط Enter لإيقاف التسجيل وأخذ لقطة نهائية"
  adb shell pkill -2 screenrecord; wait $PID 2>/dev/null; sleep 1
  adb pull /sdcard/$f.mp4 "$OUT/$f.mp4" >/dev/null; adb shell rm /sdcard/$f.mp4
  adb exec-out screencap -p > "$OUT/$f.png"
done
adb shell am broadcast -a com.android.systemui.demo -e command exit >/dev/null
echo "Done → $OUT"
# لاستخراج Frames لـ After Effects:  ffmpeg -i captured/xx.mp4 -vf fps=30 frames/xx_%04d.png
