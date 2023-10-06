import * as THREE from 'three';

const heroBg = () => {
    let scene, camera, renderer, particles;

    const particleNum = 1000;
    const maxRange = 1000;
    const minRange = maxRange / 2;
    const maxRadius = 25;

    const sizeEaseFunc = (progress) => {
        const p = progress <= 0.5 ? progress * 2 : 1 - (progress - 0.5) * 2;
        return p * p * p;
    };
    const alphaDur = 8000;
    const radiusDur = 20000;

    const color = 'rgb(0, 223, 156)';

    const vertexShader = `attribute float alpha;
    attribute float radius;
    varying float vAlpha;
    
    void main() {
      vAlpha = alpha;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = radius;
      
      gl_Position = projectionMatrix * mvPosition;
    }`;
    const fragmentShader = `uniform vec3 color;
    varying float vAlpha;
    void main() {
      float border = 0.01;
      vec2 m = gl_PointCoord - vec2(0.5, 0.5);
      float dist = 0.5*0.5 - (m.x * m.x + m.y * m.y);
      float t = smoothstep( 0., border, dist);
      gl_FragColor = vec4(color, t * vAlpha );
    }`;

    const render = (timeStamp) => {
        const verticesData = particles.geometry.attributes.position.array;
        const velArr = particles.geometry.velocities;
        const alphas = particles.geometry.attributes.alpha;
        const radii = particles.geometry.attributes.radius;

        for (let i = 0; i < verticesData.length; i += 3) {
            const velocity = velArr[i / 3];

            const velX = Math.sin(timeStamp * 0.001 * velocity.x) * 0.2 + 0.4;
            const velY = Math.sin(timeStamp * 0.005 * velocity.y) * 0.3 - 0.5;

            const velZ = 0;

            verticesData[i] += velX;
            verticesData[i + 1] -= velY;
            verticesData[i + 2] += velZ;

            if (verticesData[i] > minRange) {
                verticesData[i] = -minRange;
            }

            if (verticesData[i + 1] > minRange) {
                verticesData[i + 1] = -minRange;
            }

            alphas.array[i / 3] = sizeEaseFunc(((timeStamp + i * 557) % alphaDur) / alphaDur);

            radii.array[i / 3] = Math.max(6, sizeEaseFunc(((timeStamp + i * 1000) % radiusDur) / radiusDur) * maxRadius);
        }

        particles.geometry.attributes.position.needsUpdate = true;
        alphas.needsUpdate = true;
        radii.needsUpdate = true;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    const onResize = () => {
        const width = innerWidth;
        const height = innerHeight;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 2000);
        camera.position.set(0, -100, 400);
        camera.lookAt(scene.position);

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(new THREE.Color(0x000909));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;

        const points = [];
        for (let i = 0; i < particleNum; i++) {
            const x = Math.floor(Math.random() * maxRange - minRange);
            const y = Math.floor(Math.random() * maxRange - minRange);
            const z = Math.floor(Math.random() * maxRange - minRange);
            const particle = new THREE.Vector3(x, y, z);
            points.push(particle);
        }
        const pointGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const alphas = new Float32Array(points.length).fill(1);
        pointGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
        const radii = new Float32Array(points.length).fill(maxRadius);
        pointGeometry.setAttribute('radius', new THREE.BufferAttribute(radii, 1));

        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(color) },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            depthWrite: false,
        });

        const velocities = [];
        for (let i = 0; i < particleNum; i++) {
            const x = Math.floor(Math.random() * 6 - 3) * 0.1;
            const y = Math.floor(Math.random() * 10 + 3) * -0.02;
            const z = Math.floor(Math.random() * 6 - 3) * 0.1;
            const particle = new THREE.Vector3(x, y, z);
            velocities.push(particle);
        }

        particles = new THREE.Points(pointGeometry, shaderMaterial);
        particles.geometry.velocities = velocities;
        scene.add(particles);

        window.addEventListener('resize', onResize);

        document.getElementById('WebGL-output').appendChild(renderer.domElement);
        requestAnimationFrame(render);
    };

    init();
};

export default heroBg;
