import paramiko
import os
import sys

def upload_file(host, user, password, local_path, remote_path):
    print(f"Connecting to {host}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(host, username=user, password=password)
        print("Connected! Opening SFTP session...")
        sftp = ssh.open_sftp()
        print(f"Uploading {local_path} to {remote_path}...")
        
        # Function to print progress
        def print_progress(transferred, total):
            print(f"Transferred: {transferred}/{total} bytes ({transferred/total*100:.1f}%)", end='\r')
            
        sftp.put(local_path, remote_path, callback=print_progress)
        print("\nUpload complete.")
        sftp.close()
        
        # Now unzip the file on remote
        print("Unzipping on remote...")
        stdin, stdout, stderr = ssh.exec_command(f"unzip -o {remote_path} -d /root/mooncake-website")
        exit_status = stdout.channel.recv_exit_status()          # Wait for execution to finish
        print("Unzip stdout:", stdout.read().decode())
        print("Unzip stderr:", stderr.read().decode())
        if exit_status == 0:
            print("Successfully unzipped!")
        else:
            print(f"Unzip failed with status {exit_status}")

    except Exception as e:
        print(f"Failed: {e}")
    finally:
        ssh.close()

if __name__ == "__main__":
    upload_file(
        host="163.61.73.19",
        user="root",
        password="Lehang0971682213",
        local_path="mooncake-website.zip",
        remote_path="/root/mooncake-website.zip"
    )
