// Get peer id from URL (no hash).
const myPeerId = location.hash.slice(1);

// Connect to peer server.
peer = new Peer(myPeerId, {
  host: "glajan.com",
  port: 8443,
  path: "/myapp",
  secure: true,
});

// Print peer id on connection 'open' event.
peer.on("open", (id) => {
  const myPeerIdEl = document.querySelector(".my-peer-id");
  myPeerIdEl.innerText = id;
});

// Error message.
peer.on("error", (errorMessage) => {
  console.error(errorMessage);
});

// Event listener for click "Refresh list".
const peersEl = document.querySelector(".peers");
const refreshPeersButtonEl = document.querySelector(".list-all-peers-button");
refreshPeersButtonEl.addEventListener("click", (e) => {
  peer.listAllPeers((peers) => {
    // Add peers to list.
    const peersList = peers

      // Filter out our own name.
      .filter((peerId) => peerId !== peer._id)

      // :oop through all peers and print their name.
      .map((peer) => {
        return `
        <li>
        <button class="connect-button peerId-${peer}">${peer}</button>
        </li>
        `;
      })
      .join("");
    peersEl.innerHTML = `<ul>${peersList}</ul>`;
  });
});
