app=mysite
while :
do
  if python /api/$app/manage.py migrate; then
    break
  else
    sleep 1
  fi
done

exit 0