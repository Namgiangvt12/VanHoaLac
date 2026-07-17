import paramiko

def test_auth(host, user, password):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(host, username=user, password=password, timeout=10)
        print(f"Success for user '{user}'!")
        ssh.close()
    except Exception as e:
        print(f"Failed for user '{user}': {e}")

if __name__ == "__main__":
    host = "163.61.73.19"
    pwd = "Lehang0971682213"
    users = ["resit", "vm07161032"]
    for u in users:
        test_auth(host, u, pwd)
