# 存在しないDBへの接続を試みた場合に送出されるエラー対策
# 原因：まだDBの準備が出来ていない
# 対策：何かしらの手段で出来るまで待つ
# 削除してもいいやつ⇒ Mysqlのドッカーが使用できない理由は、portに3306以外を使用したから。

import os
import pymysql
from time import sleep
from pathlib import Path

count_to_try = 0
LIMIT_OF_COUNT = 20

def check_connection(count, limit):
    """
    docker-compose up実行時用、時間調整のための関数。
    """
    try:
        conn = pymysql.connect(
            unix_socket = "/var/run/mysqld/mysqld.sock",
            user="root",
            passwd="password",
            host="db",
            port=3306,
            db="nani_taberu",
        )
    except pymysql.OperationalError as e:
        count += 1
        print("Waiting for MySQL... (", count, "/ 20 )")
        sleep(3)
        if count < limit:
            check_connection(count, limit)
        else:
            print(e)
            print("Failed to connect mySQL.")
    else:
        print("Connected!\n")
        conn.close()
        exit()


if __name__ == "__main__":
    check_connection(count_to_try, LIMIT_OF_COUNT)