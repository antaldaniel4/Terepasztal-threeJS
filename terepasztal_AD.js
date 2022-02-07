import * as THREE from './js-r132/build/three.module.js';
import {TrackballControls} from './js-r132/examples/jsm/controls/TrackballControls.js';
import {DoubleSide, FrontSide, MathUtils} from "./js-r132/build/three.module.js";
import {OBJLoader} from "./js-r132/examples/jsm/loaders/OBJLoader.js";
import {MTLLoader} from "./js-r132/examples/jsm/loaders/MTLLoader.js";
import {TWEEN} from "./js-r132/examples/jsm/libs/tween.module.min.js";

// Globális változók
var WIDTH, HEIGHT, aspectRatio;
var renderer;
var scene, camera;
var controls;
var meshLoaded, meshLoaded2, meshLoaded3, meshLoaded4, meshLoaded5,meshLoaded6;
var trainMove =false;


//elemek
var geometryBird, materialBird, meshBird;
var BirdOffsetX = 220;
var BirdOffsetY = -2;
var BirdOffsetZ = 40;


//Allomas
var geometryWall, materialWall, meshWall;
var geometryRoof1, materialRoof1, meshRoof1;
var geometryRoof2, materialRoof2, meshRoof2;
var geometryPillar1, materialPillar1, meshPillar1;
var geometryPillar2, materialPillar2, meshPillar2;

//talaj
var geometryPlane, materialPlane, meshPlane;

//fények
var ambiLight = new THREE.AmbientLight(0xffffff, 0.4);

var pointLightSun = new THREE.PointLight(0xFCF3CF, 2.5, 1000);
pointLightSun.position.set(0, 600, -80);
pointLightSun.target = meshBird;
pointLightSun.castShadow = true;
pointLightSun.visible = true;

var pointLightMoon = new THREE.PointLight(0x85C1E9, 1, 1000);
pointLightMoon.position.set(0, 600, -80);
pointLightMoon.target = meshBird;
pointLightMoon.castShadow = true;
pointLightMoon.visible = false;

var spotLight = new THREE.SpotLight(0xffffff, 2, 500, MathUtils.degToRad(20));
spotLight.position.set(50, 80, 300);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;


//texturák

var textureLoader = new THREE.TextureLoader();
var textureGrass = textureLoader.load('assets/ground.jpg');
var textureRoof = textureLoader.load('assets/rooftile.jpg');

//animáció
var orbitAngle = 0.0;
var orbitRadius = 120.0;


//init();
// Egy képkocka rajzolása
// render();
// Animáció indítása
//animate();

//loader_obj()
loader_obj_mtl();

function loader_obj_mtl() {
    var OBJFile = 'assets/bird.obj';
    var MTLFile = 'assets/bird.mtl';

    new MTLLoader()
        .load(MTLFile, function (materials) {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .load(OBJFile, function (object) {
                    meshLoaded = object;
                    console.log(object);

                    object.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                            child.scale.set(5,5,5);
                            child.position.set(-BirdOffsetX, BirdOffsetY,BirdOffsetZ);
                            child.material.side = THREE.DoubleSide;
                            child.material.shininess = 10;
                            child.rotation.y = -1.0 * THREE.MathUtils.degToRad( 90 );
                            //child.material.emissive = new THREE.Color(0xffffff);
                            child.material.emissiveIntensity = 0.4;
                        }
                    });
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
                    loader_obj_mtl2();

                    // init() csak tesztelésre!!!! utolsó fv ben meghívni!!!
                    //init();
                });
        });
}               //Bird
// IDE A loader_obj_mtl.... MEGHÍVVA A KÖVETKEZŐ FV-T
function loader_obj_mtl2() {
    var OBJFile2 = 'assets/newMountain.obj';
    var MTLFile2 = 'assets/newMountain.mtl';

    new MTLLoader()
        .load(MTLFile2, function (materials) {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .load(OBJFile2, function (object2) {
                    meshLoaded2 = object2;
                    //console.log(object2);

                    object2.traverse(function (child2) {
                        if (child2 instanceof THREE.Mesh) {
                            child2.scale.set(10, 10, 10);
                            child2.position.set(120,-12, -80);
                            child2.rotation.y = -1.0 * THREE.MathUtils.degToRad( -45 );
                            child2.material.shininess = 1;
                            child2.castShadow = true;
                            child2.receiveShadow = true;
                        }
                    });
                    loader_obj_mtl3();
                    //init();
                });
        });
}               //HEgy
function loader_obj_mtl3() {
    var OBJFile3 = 'assets/tree_demo0.obj';
    var MTLFile3 = 'assets/tree_demo0.mtl';

    new MTLLoader()
        .load(MTLFile3, function (materials) {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .load(OBJFile3, function (object3) {
                    meshLoaded3 = object3;
                    //console.log(object2);

                    object3.traverse(function (child3) {
                        if (child3 instanceof THREE.Mesh) {
                            child3.scale.set(8,8,8);
                            child3.position.set(-120,-11,-130);
                            child3.material.shininess = 1;
                            child3.castShadow = true;
                            child3.receiveShadow = true;
                        }
                    });
                    loader_obj_mtl4();
                    //init();
                });
        });
}               //Fa1
function loader_obj_mtl4() {
    var OBJFile4 = 'assets/mozdony.obj';
    var MTLFile4 = 'assets/mozdony.mtl';

    new MTLLoader()
        .load(MTLFile4, function (materials) {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .load(OBJFile4, function (object4) {
                    meshLoaded4 = object4;
                    //console.log(object2);

                    object4.traverse(function (child4) {
                        if (child4 instanceof THREE.Mesh) {
                            child4.scale.set(4,4,4);
                            child4.position.set(-20,0,-80);
                            child4.rotation.z = -1.0 * THREE.MathUtils.degToRad( 270 );
                            child4.rotation.y = -1.0 * THREE.MathUtils.degToRad( 90 );
                            child4.castShadow = true;
                            child4.receiveShadow = true;
                            //child4.material.shininess = 1;
                        }
                    });
                    loader_obj_mtl5();
                    //init();
                });
        });
}               //vonat
function loader_obj_mtl5() {
    var OBJFile5 = 'assets/tree_demo0.obj';
    var MTLFile5 = 'assets/tree_demo0.mtl';

    new MTLLoader()
        .load(MTLFile5, function (materials) {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .load(OBJFile5, function (object5) {
                    meshLoaded5 = object5;
                    //console.log(object2);

                    object5.traverse(function (child5) {
                        if (child5 instanceof THREE.Mesh) {
                            child5.scale.set(8,8,8);
                            child5.position.set(-70,-11,150);
                            child5.material.shininess = 1;
                            child5.castShadow = true;
                            child5.receiveShadow = true;
                        }
                    });
                     loader_obj_mtl6();
                    //init();
                });
        });
}
function loader_obj_mtl6() {
    var OBJFile6 = 'assets/tree_demo0.obj';
    var MTLFile6 = 'assets/tree_demo0.mtl';

    new MTLLoader()
        .load(MTLFile6, function (materials) {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .load(OBJFile6, function (object6) {
                    meshLoaded6 = object6;
                    //console.log(object2);

                    object6.traverse(function (child6) {
                        if (child6 instanceof THREE.Mesh) {
                            child6.scale.set(8,8,8);
                            child6.position.set(150,-11,20);
                            child6.material.shininess = 1;
                            child6.castShadow = true;
                            child6.receiveShadow = true;
                        }
                    });
                    //loader_obj_mtl4();
                    init();
                });
        });
}               //Fa3



function loader_obj() {
    var OBJFile = 'assets/trainstation_demo0.obj';
    //var OBJFile = 'assets/models/sphere_uv_smooth.obj';
    //var OBJFile = 'assets/models/csonak.obj';

    var loader = new OBJLoader();
    loader.load(
        // Forrás URL
        OBJFile,
        // Modell betöltése utáni függvény
        function ( object ) {
            // A loaded egy THREE.Group objektum lesz, amelynek a gyermeke(i) a mesh(-ek)!
            meshLoaded = object;
            console.log(object);

            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.scale.set(4, 4, 4);
                    child
                    //child.material.side = THREE.DoubleSide;
                }
            });

            init();
        },
        // Betöltés előrehaladása közben hívódik
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // Hibás betöltés esetén
        function ( error ) {
            console.log( 'An error happened!', error.currentTarget.statusText, error.currentTarget.responseURL );
        });
}

var infoPanel;
function init() {


    infoPanel = document.getElementById( 'infopanel' );
    // Böngésző ablakméret lekérése és méretarány számítása
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    aspectRatio = WIDTH / HEIGHT;

    // Renderer létrehozása és DOM-hoz adása
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x111111);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Színtér létrehozása
    scene = new THREE.Scene();

    // Kamera létrehozása és vetítési paramétereinek beállítása
    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 10, 20);
    camera.lookAt(scene.position);

    // Objektumok létrehozása

    //Allomas

    geometryWall = new THREE.BoxGeometry(40, 25, 40, 10, 10, 10);
    materialWall = new THREE.MeshPhongMaterial({color: 0xF5CBA7});
    meshWall = new THREE.Mesh(geometryWall, materialWall);
    meshWall.position.set(-20, 5, 150);
    meshWall.castShadow = true;
    meshWall.receiveShadow = true;

    geometryRoof1 = new THREE.ConeGeometry(30,25,4)
    materialRoof1 = new THREE.MeshPhongMaterial();
    materialRoof1.map = textureRoof;
    meshRoof1 = new THREE.Mesh(geometryRoof1, materialRoof1);
    meshRoof1.position.set(-20, 30, 150);
    meshRoof1.rotation.y = -Math.PI / 4;
    meshRoof1.castShadow = true;
    meshRoof1.receiveShadow = true;


    geometryRoof2 = new THREE.BoxGeometry(40, 2, 40);
    materialRoof2 = new THREE.MeshPhongMaterial();
    materialRoof2.map = textureRoof;
    meshRoof2 = new THREE.Mesh(geometryRoof2, materialRoof2);
    meshRoof2.position.set(-20, 18, 120);
    meshRoof2.rotation.y = -Math.PI / 2;
    meshRoof2.castShadow = true;
    meshRoof2.receiveShadow = true;


    geometryPillar1 = new THREE.CylinderGeometry(2, 2, 25);
    materialPillar1 = new THREE.MeshPhongMaterial({color: 0xF5CBA7});
    meshPillar1 = new THREE.Mesh(geometryPillar1, materialPillar1);
    meshPillar1.position.set(-3, 5, 105);
    meshPillar1.castShadow = true;
    meshPillar1.receiveShadow = true;

    geometryPillar2 = new THREE.CylinderGeometry(2, 2, 25);
    materialPillar2 = new THREE.MeshPhongMaterial({color: 0xF5CBA7});
    meshPillar2 = new THREE.Mesh(geometryPillar2, materialPillar2);
    meshPillar2.position.set(-33, 5, 105);
    meshPillar2.castShadow = true;
    meshPillar2.receiveShadow = true;

/*
    //Madár
    geometryBird = new THREE.ConeGeometry( 2, 4, 5 );
    materialBird = materialPlane = new THREE.MeshPhongMaterial({color : 0x6E2C00 });
    meshBird = new THREE.Mesh(geometryBird, materialBird);
    meshBird.position.set(-BirdOffsetX, BirdOffsetY, BirdOffsetZ);
    meshBird.rotation.x = Math.PI /2;
    meshBird.castShadow = true;
    meshBird.receiveShadow = true;

*/
    //Plane
    geometryPlane = new THREE.PlaneGeometry(400, 400, 20, 20);
    materialPlane = new THREE.MeshPhongMaterial({shininess: 0, side: THREE.DoubleSide});
    materialPlane.map = textureGrass;
    meshPlane = new THREE.Mesh(geometryPlane, materialPlane);
    meshPlane.rotation.x = -Math.PI / 2;
    //meshPlane.rotation.z = Math.PI;
    meshPlane.position.set(0, -8, -20);
    meshPlane.receiveShadow = true;




    //Segéd geometriák
    var axesHelper = new THREE.AxesHelper(100);
    var spotLightHelper = new THREE.SpotLightHelper(spotLight);
    var pointLightHelper = new THREE.PointLightHelper(pointLightSun, 30);

    // Tárgy színtérhez adása

    scene.add(meshPlane);
    scene.add(ambiLight);
  //  scene.add(pointLightHelper);
    scene.add( pointLightSun);
    scene.add( pointLightMoon);

    scene.add(spotLight);
  //  scene.add(spotLightHelper);
   // scene.add(axesHelper);
//    scene.add(meshBird);                //Madár
    scene.add(meshLoaded);              //Állomás
    scene.add(meshLoaded2);             //Mountain
    scene.add(meshLoaded3);             //tree
    scene.add(meshLoaded4);             //train
    scene.add(meshLoaded5);             //tree
    scene.add(meshLoaded6);             //tree
    scene.add(meshWall);
    scene.add(meshRoof1);
    scene.add(meshRoof2);
    scene.add(meshPillar1);
    scene.add(meshPillar2);


    // Az ablak későbbi átméretezése esetén visszahívható függvény megadása
    window.addEventListener('resize', handleWindowResize, false);
    window.addEventListener('keydown', handleKeyDown);



    // Kamera vezérlés
    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 5.0;
    controls.panSpeed = 1.0;
    camera.position.x = 150;

    console.log(meshLoaded);


    animate();
}
function setInfoPanelText( msg ) {
    infoPanel.innerHTML = msg;
}
var state = true;
var step =0;
var bouncingSpeed = 0.02;
function handleWindowResize() {
    // Az ablak átméretezése esetén a kamera vetítési paraméterek újraszámolása
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    console.log('WIDTH=' + WIDTH + '; HEIGHT=' + HEIGHT);
    renderer.setSize(WIDTH, HEIGHT);
    aspectRatio = WIDTH / HEIGHT;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    render();
}
function handleKeyDown(event){
    console.log('keydown: ' + event.keyCode);

    if(event.keyCode == 38){
        BirdOffsetZ += 10;          //Fel
    }
    if(event.keyCode == 40){
        BirdOffsetZ -= 10;          //Le
    }
    if(event.keyCode == 37){
        BirdOffsetX += 10;          //jobbra
    }
    if(event.keyCode == 39){
        BirdOffsetX -= 10;          //balra
    }
    if(event.keyCode == 78){
        pointLightSun.visible = false;
        pointLightMoon.visible = true;

    }
    if(event.keyCode == 68) {
        pointLightSun.visible = true;
        pointLightMoon.visible = false;

    }
    if(event.keyCode == 48) {
        trainMove = false;


    }
    if(event.keyCode == 49) {
        trainMove = true;

    }
    if(event.keyCode == 73) {
        if (state) {
            setInfoPanelText('visibility: hidden');
            state = false;
        }
        else {
            setInfoPanelText('visibility: visible');
            state = true;
        }
    }




    // night - 78
// day - 68
// i - 73

}

function animate() {


    //meshLoaded.position.z = 1;
    if (trainMove) {
    orbitAngle += 0.12;
    var trainPosition ;
    var radians = orbitAngle * Math.PI / 180;

        meshLoaded4.rotation.y = orbitAngle * 0.05;
    }


    // bounce the sphere up and down
    step += bouncingSpeed;
 /*   meshBird.position.x = BirdOffsetX + ( 35 * (Math.cos(step)));
    meshBird.position.y = BirdOffsetY + ( 25 * Math.abs(Math.sin(step)));
    meshBird.position.z = BirdOffsetZ + ( 15 * Math.cos(step/2));               /*

  */
    meshLoaded.position.x = BirdOffsetX + (35*  (Math.cos(step)));
    meshLoaded.position.y = BirdOffsetY + ( 25* Math.abs(Math.sin(step)));
    meshLoaded.position.z = BirdOffsetZ + (15*  Math.cos(step/2));

//    meshBird.position.x = Math.cos( 2* radians ) * orbitRadius * 0.2;
//    meshBird.position.z = Math.sin( 2* radians ) * orbitRadius * 0.2;
//    meshBird.position.y = Math.tan( radians ) * orbitRadius * 0.2;

    // Újabb képkocka rajzolásának kérése.
    // Maximálisan 60 FPS-t biztosít a rendszer.
    requestAnimationFrame(animate);
    // Kameramozgás vezérlése
    controls.update();
    TWEEN.update();
    // Új képkocka rajzolása
    render();
}

function render() {
    // 3D -> 2D vetített kép kiszámítása.
    // scene 3D színtér képe a camera kamera szemszögéből.
    renderer.render(scene, camera);
}