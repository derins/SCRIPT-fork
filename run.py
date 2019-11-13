import os
import subprocess
import json
import paramiko

VAR_FILE_PATH = './variables.env'
TF_DIR = './utils/aws/terraform'
TF_VAR_TEMPLATE_PATH = os.path.join(TF_DIR, 'variables_template.tf')
TF_VAR_FILE_PATH = os.path.join(TF_DIR, 'variables.tf')

DB_HOST = None
EC2_IP = None


def read_env_variables(file_path):
    """read environment variables for the whole project and return as a dict
        file_path: path for variables.env
    """
    with open(file_path, 'r') as f:
        content = f.readlines()
    var_dict = {}
    for line in content:
        if '=' in line:
            key, value = line.strip().split('=')
            var_dict[key] = value
    return var_dict


def generate_tf_variables(var_dict, in_path, out_path):
    """generate variables.tf for terraform
        var_dict: dict from variables.env for the whole project
        in_path: variables_template.tf
        out_path: variables.tf
    """
    with open(in_path, 'r') as f:
        content = f.readlines()
    template = [line for line in content]

    for key, value in var_dict.items():
        var_key = '$' + key
        for i in range(len(template)):
            if var_key in template[i]:
                template[i] = template[i].replace(var_key, value)
    
    with open(out_path, 'w') as f:
        for line in template:
            f.write(line)


def run_terraform(tf_dir):
    """run terraform to launch all resources required
        tf_dir: directory containing main.tf file
    """
    # terraform init
    result = subprocess.run(['terraform', 'init'], stdout=subprocess.PIPE, cwd=tf_dir)
    print(result.stdout.decode('utf-8'))

    # terraform apply
    result = result = subprocess.run(['terraform', 'apply'], stdout=subprocess.PIPE, cwd=tf_dir)
    output = result.stdout.decode('utf-8')
    print(output)

    # TODO @Hanya: get DB_HOST from output
    DB_HOST = subprocess.run(['terraform', 'output', 'script_postgresql_db_host'], stdout=subprocess.PIPE, cwd=tf_dir)
    DB_HOST = DB_HOST.stdout.decode('utf-8')

    # TODO @Hanya: get EC2 IP from output
    EC2_IP = subprocess.run(['terraform', 'output', 'script_algorithm_ins_ip'], stdout=subprocess.PIPE, cwd=tf_dir)
    EC2_IP = EC2_IP.stdout.decode('utf-8')


env_var_dict = read_env_variables(VAR_FILE_PATH)
#generate_tf_variables(env_var_dict, TF_VAR_TEMPLATE_PATH, TF_VAR_FILE_PATH)
#run_terraform(TF_DIR)

# TODO @Yuchao: run your script(now you should have both DB_HOST and EC2_IP)
def run_algorithm():
    DB_HOST = 'script-postgresql-db.cfnv951vt1nj.us-east-1.rds.amazonaws.com'
    EC2_IP = 'ec2-52-91-245-38.compute-1.amazonaws.com'

    # save information into a file for reading
    postgres_info = {
        'DB_HOST': DB_HOST,
        'CLEANED_DATA_BUCKET_NAME': env_var_dict['CLEANED_DATA_BUCKET_NAME'],
        'POSTGRES_USER': env_var_dict['POSTGRES_USER'],
        'POSTGRES_PASSWORD': env_var_dict['POSTGRES_PASSWORD'],
        'POSTGRES_DB': env_var_dict['POSTGRES_DB']
    }
    with open('ec2setup/algorithms/SmartCharging/postgres_info.json', 'w') as outfile:
        json.dump(postgres_info, outfile)
    
    key = paramiko.RSAKey.from_private_key_file('script.pem.txt')
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    # Connect/ssh to an instance
    try:
        # Here 'ubuntu' is user name and 'instance_ip' is public IP of EC2
        client.connect(hostname=EC2_IP, username="ubuntu", pkey=key)

        print('Connect succeed...')
        # Execute a command(cmd) after connecting/ssh to an instance
        stdin, stdout, stderr = client.exec_command(
            'sudo chmod 777 SCRIPT/run_algorithm.sh'
        )

        print('chmod succeed...')

        stdin, stdout, stderr = client.exec_command(
            './SCRIPT/run_algorithm.sh'
        )
        print(stdout.read())
        print('error message:')
        print(stderr.read())
        # close the client connection once the job is done
        client.close()

    except Exception as e:
        print(e)

run_algorithm()