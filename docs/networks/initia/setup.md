
| References                                                                   |
| ---------------------------------------------------------------------------- |
| [Official Docs](https://docs.initia.xyz/run-initia-node/running-initia-node) |
|                                                                              |

## Dependencies

```
sudo apt update
sudo apt install -y build-essential
```

#### Install asdf

```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
```

#### Update profile

```
echo '. "$HOME/.asdf/asdf.sh"' >> ~/.bashrc
echo '. "$HOME/.asdf/completions/asdf.bash"' >> ~/.bashrc
source ~/.bashrc
```

#### Install golang

```
asdf add-plugin golang
asdf install golang 1.22.0
asdf global golang 1.22.0
```

#### Verification

```
go version // go version go1.22.0 linux/amd64
```

#### Build

```
git clone https://github.com/initia-labs/initia.git
cd initia
git checkout v0.2.15
make build
```

#### Update/Install Binaries

```
sudo cp ./build/initiad /usr/local/bin
initiad version // v0.2.15 
```

#### Init Node

```
initiad init <monkier>
```

#### Genesis

```
curl -Ls https://initia.s3.ap-southeast-1.amazonaws.com/initiation-1/genesis.json > \
         $HOME/.initia/config/genesis.json

```

#### Seeds, Peers

```
persistent_peers = "093e1b89a498b6a8760ad2188fbda30a05e4f300@35.240.207.217:26656,2c729d33d22d8cdae6658bed97b3097241ca586c@195.14.6.129:26019"
seeds = "2eaa272622d1ba6796100ab39f58c75d458b9dbc@34.142.181.82:26656,c28827cb96c14c905b127b92065a3fb4cd77d7f6@testnet-seeds.whispernode.com:25756"
// You should update them in the $HOME/.initia/config/config.toml
```

#### Address Book

```
wget https://initia.s3.ap-southeast-1.amazonaws.com/initiation-1/addrbook.json
mv addrbook.json ~/.initia/config/addrbook.json
```

#### Service&#x20;

```
// create a initiad.service file 
[Unit]
Description=Initia node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/.initia
ExecStart=$(which initiad) start --home $HOME/.initia
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target

```

```
sudo systemctl daemon-reload // reload daemon
sudo systemctl restart initiad // enable the service
```

#### Verify

```
sudo journalctl -u initiad -f
```
