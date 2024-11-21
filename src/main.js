import './styles.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const scene = new THREE.Scene()



const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: document.getElementById('canvas') })
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.outputEncoding = THREE.sRGBEncoding
const loader = new THREE.LoadingManager();

const rgbLoader = new RGBELoader(loader) // Create an instance of RGBELoader with the loader
rgbLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/rosendal_park_sunset_2k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.environment = texture
})

const material = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  roughness: 0.1,
  metalness: 1,
  reflectivity: 0.5,
  ior: 4,
  color: 'red',
  side: THREE.DoubleSide,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uTimeFrequency: { value: 0.5 },
    uPositionFrequency: { value: 0.1 },
    uPositionStrength: { value: .5 },
    uSmallWavePositionFrequency: { value: 1.0 },
    uSmallWaveTimeFrequency: { value: 1.0 },
    uSmallWavePositionStrength: { value: 1.0 },
  },
})
const mergeGeometry = mergeVertices(new THREE.IcosahedronGeometry(1, 128,128))
mergeGeometry.computeTangents()
console.log(mergeGeometry.attributes);
const mesh = new THREE.Mesh(mergeGeometry, material)
scene.add(mesh)

const fit = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', fit)

const clock = new THREE.Clock()
const animate = () => {
  requestAnimationFrame(animate)
  material.uniforms.uTime.value = clock.getElapsedTime();
  renderer.render(scene, camera)
}

fit()
animate()


function getRandomInt(min, max) {
  if (min > max) {
    [min, max] = [max, min]
  }
 console.log(min);
}
// Load HDRI
getRandomInt(10, 1)