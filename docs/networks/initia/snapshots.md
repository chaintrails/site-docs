---
network: abc
---
<script setup>
  import SnapShotData from '../../.vitepress/components/SnapShotData.vue'
</script>
#### Dependencies
```
sudo apt install wget zstd pv aria2 -y
```
<SnapShotData/>

#### Download the latest snapshot

```
aria2c -x 16 -s 16 -o "initia_latest.tar.zst" "https://snaps.chaintrails.io/testnets/initia/initiation-1_latest.tar.zst"
```

#### Reset Node

```
initiad tendermint unsafe-reset-all --home $HOME/.initia
sudo systemctl stop initiad 
```

#### (Optional) Backup Validator State

```
cp $HOME/.initia/data/priv_validator_state.json /tmp
```

#### Reset Node

```
initiad tendermint unsafe-reset-all --home $HOME/.initia
sudo systemctl stop initiad 
```

#### Restore Snap

```
pv initia_latest.tar.zst | zstd -d -T0 | tar -xf - -C $HOME/.initia/data
```

#### (Optional) Restore State

```
cp /tmp/priv_validator_state.json $HOME/.initia/data/
```

#### Restart Service

```
sudo systemctl restart initiad
```

#### Verify the Logs

```
 sudo journalctl -u initiad.service -f
```

