<template>
    <h1>Snapshots</h1>
    <p>Snapshots are auto updated every 3 hours</p>
    <h2>Recent Snapshot</h2>
    <table data-view="cards">
      <thead>
        <tr>
          <th>Block Number</th>
          <th>URL</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ snapshotData.block }}</td>
          <td><a :href="snapshotData.url" target="_blank">{{ snapshotData.url }}</a></td>
          <td>{{ snapshotData.timestamp }}</td>
        </tr>
      </tbody>
    </table>
    
</template>

<script setup>
import { ref, onMounted } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const snapshotData = ref({
  block: null,
  url: null,
  timestamp: null,
});

const networkName = ref('');

async function fetchSnapShotData() {
  try {
    // Fetch the meta.json file
    const metaResponse = await fetch('./meta.json');
    const metaData = await metaResponse.json();

    // Extract the type, network, and service from meta.json
    const { type, network, service } = metaData;

    // Set the network name
    networkName.value = network;

    // Fetch the snapshot data from the control-center API
    const snapshotResponse = await fetch(`${BASE_URL}/snaps/${type}/${network}`);

    if (snapshotResponse.ok) {
      const recentSnapData = await snapshotResponse.json();
      console.log('snapshotData:', snapshotData);

      // Update the snapshotData reactive object
      snapshotData.value = {
        block: recentSnapData.block,
        url: recentSnapData.url,
        timestamp: recentSnapData.timestamp,
      };
    } else {
      console.error('Error fetching snapshot data:', snapshotResponse.status);
    }
  } catch (error) {
    console.error('Error fetching network data:', error);
  }
}

onMounted(fetchSnapShotData);
</script>