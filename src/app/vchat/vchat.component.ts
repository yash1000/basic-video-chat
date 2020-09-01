import { Component, OnInit, ViewChild } from '@angular/core';
declare var SimplePeer: any;
@Component({
  selector: 'app-vchat',
  templateUrl: './vchat.component.html',
  styleUrls: ['./vchat.component.scss'],
})
export class VchatComponent implements OnInit {
  // @ViewChild('myvideo') myvideo: any;
  @ViewChild('myvideo', { static: true }) myVideo: any;
  targetpeer: any;
  peer: any;
  n = (navigator as any) as any;

  constructor() {}

  ngOnInit() {
    const video = this.myVideo.nativeElement;
    let peerx: any;
    this.n.getUserMedia =
      this.n.getUserMedia ||
      this.n.webkitGetUserMedia ||
      this.n.mozGetUserMedia ||
      this.n.msGetUserMedia;
    this.n.getUserMedia(
      {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'screen',
            maxWidth: 1280,
            maxHeight: 720,
          },
          optional: [],
        },
      },
      function(stream) {
        peerx = new SimplePeer({
          initiator: location.hash === '#init',
          trickle: false,
          stream,
        });
        console.log(peerx);

        peerx.on('signal', function(data) {
          console.log(JSON.stringify(data));

          this.targetpeer = data;
        });

        peerx.on('data', function(data) {
          console.log('Recieved message:' + data);
        });

        peerx.on('stream', function(stream) {
          video.srcObject = window.URL.createObjectURL(stream);
          video.play();
        });
      },
      function(err) {
        console.log('Failed to get stream', err);
      }
    );

    setTimeout(() => {
      this.peer = peerx;
      console.log(peerx);
      console.log(this.peer);
    }, 5000);
  }

  connect() {
    this.peer.signal(JSON.parse(this.targetpeer));
  }

  message() {
    this.peer.send('Hello world');
  }
}
