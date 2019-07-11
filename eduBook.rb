script "eduBook" do
  interpreter "bash"
  user "root"
  cwd "/tmp"
 code <<-EOH
sudo apt update -y #update stuff
sudo apt install nginx python python-pip git -y #install engine-x and things

#change nginx config file
echo ''' 
server {
	listen 80 default_server;
	listen [::]:80 default_server;
	root /var/www/html;

	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / { 
	    proxy_pass http://127.0.0.1:8888;
	    proxy_http_version 1.1;
	    proxy_read_timeout 300;
	    proxy_set_header Upgrade $http_upgrade;
	    proxy_set_header Connection "upgrade";
	    proxy_set_header Host $http_host;
	    proxy_set_header X-Real-IP $remote_addr;
	    proxy_set_header X-Real-PORT $remote_port;
	}
}
''' | sudo tee /etc/nginx/sites-available/default


sudo service nginx reload #reload service

sudo ufw allow 'Nginx HTTP' #open firewall

git clone https://github.com/quin2/webssh.git #grab what we need
cd webssh
pip install -r requirements.txt #install project...

python run.py --address='127.0.0.1' --port=8888 #run zee app
  EOH
end