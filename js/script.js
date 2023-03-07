window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
    canvasApp();
    }

function canvasSupport () {
    return Modernizr.canvas;
    }

function canvasApp()  {

    if ( !canvasSupport() ) {
        return;
    }

    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    //const canvasUI = document.getElementById('myCanvas_ui');
    //const ctxUI = canvasUI.getContext('2d');

    //const canvasBG = document.getElementById('myCanvas_bg');
    //const ctxBG = canvasBG.getContext('2d');
/*
    let mouseMoveCoords = {
        x: 0,
        y: 0
    };
    let mouseClickCoords = {
        x: 0,
        y: 0
    };
*/
/*
    //цикл игры
    function gameLoop() {
        //game.drawScreen();
        ctx.rect( 0,0,200,200 )
        ctx.fill()
        window.requestAnimationFrame( gameLoop );
    }

    //обработчики событий
    function mouseMoveHandler( e ) {
        mouseMoveCoords.x = e.offsetX;
        mouseMoveCoords.y = e.offsetY;
    }

    function mouseUpHandler( e ) {
            mouseClickCoords.x = e.offsetX;
            mouseClickCoords.y = e.offsetY;
    }
    */
    //слушатели событий
        //canvas.addEventListener( 'mousemove', mouseMoveHandler );
       // canvas.addEventListener( 'mouseup', mouseUpHandler );

    //const game = new Game();

    //game.init();
    //gameLoop();
    
    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Collision = Matter.Collision,
        Query = Matter.Query;

    // create an engine
    var engine = Engine.create();
/*
    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine
    });
*/
    // create two boxes and a ground
    var boxA = Bodies.rectangle( 400, 200, 80, 80, { isStatic: true } );
    //var boxB = Bodies.rectangle(450, 50, 80, 80);
    var boxBC = Bodies.polygon( 200, 200, 3, 50, { isStatic: true } );

    //var boxB = Bodies.trapezoid( 450, 50, 50, 50, 0.2 );
    var star = [ {
        "x":0,
        "y":0
       }, 
       {
        "x":93.3333333333334,
        "y":0
       }, 
       {
        "x":92,
        "y":31.3333333333334
       }, 
       {
        "x":61.3333333333334,
        "y":31.3333333333334
       }, 
       {
        "x":60.6666666666666,
        "y":63.3333333333334
       }, 
       {
        "x":28.6666666666666,
        "y":62.6666666666667
       }, 
       {
        "x":28.6666666666666,
        "y":94.6666666666667
       }, 
       {
        "x":-2,
        "y":94
    } ];
    //Body.rotate( boxA, Math.PI/6 )
    //Body.scale( boxA, 0.5,0.5 )
    //Body.translate( boxA, { x: 200, y: 200 } )

    //Body.setMass( boxA, 10000000 ) 
    //console.log( boxA.mass );
    //console.log( boxA.density );

    var boxB = Bodies.fromVertices( 450, 50, star, { isStatic: true } );

    //console.log( boxB.vertices );
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true } );

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, boxBC, ground]);
    Collision.create( boxBC, boxA );
    //console.log( Collision.collides(  boxBC, boxA  ) );
    let query = Query.collides( boxBC, [boxA,boxB]  );
/*
    setInterval( ()=> {
        Body.setPosition( boxA, { x: 600, y: 300 } )
    },2000 )*/
/*
    // run the renderer
    Render.run(render);
*/
/*
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
    */
    //var canvas = document.createElement('canvas'),
   // context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    //document.body.appendChild(canvas);

    (function render() {
        
        var bodies = Composite.allBodies(engine.world);

        window.requestAnimationFrame(render);

        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.beginPath();

        for (var i = 0; i < bodies.length; i += 1) {
            var vertices = bodies[i].vertices;

            context.moveTo(vertices[0].x, vertices[0].y);

            for (var j = 1; j < vertices.length; j += 1) {
                context.lineTo(vertices[j].x, vertices[j].y);
            }

            context.lineTo(vertices[0].x, vertices[0].y);
        }

       // context.rect(0,0,20,10)

        context.lineWidth = 1;
        context.strokeStyle = '#ff0000';
        context.stroke();
    })();

    //runner
    (function run() {
        window.requestAnimationFrame(run);
        const collision = Collision.collides( boxBC, boxA );
        if ( collision ) {
            //console.log( collision );
            const normal = collision.normal;
            //console.log( collision.penetration );
            //console.log( collision.supports );
            //console.log( collision.normal );
            Body.translate( boxBC, {x:collision.penetration.x * -1,y:collision.penetration.y * -1} );  
            //*
        }
        //console.log( query );

        Engine.update(engine, 1000 / 60);
    })();

    window.addEventListener( 'keyup', ()=> {
        //Body.setPosition( boxA, {x:100,y:100} )  
       // Body.setPosition( ground, {x:400,y:ground.position.y -= 0.1} )
        //Body.update( ground )
        //Body.setVelocity( boxA, {x:-2,y:-10} )
        //console.log( boxA.position.x );
        //!! don't work!!??  Body.applyForce( boxA, {x: boxA.position.x,y:boxA.position.y}, {x:0,y:-100} )
    } );
    window.addEventListener( 'keydown', keyUpHandler );

    function keyUpHandler(e) {
        if ( e.code === 'ArrowLeft' ) {
           // console.log('Left');
           Body.translate( boxBC, {x:-1,y:0} )  
        }
        if ( e.code === 'ArrowRight' ) {
            // console.log('Left');
            Body.translate( boxBC, {x:1,y:0} )  
        }
        if ( e.code === 'ArrowUp' ) {
            // console.log('Left');
            Body.translate( boxBC, {x:0,y:-1} )  
         }
         if ( e.code === 'ArrowDown' ) {
            // console.log('Left');
            Body.translate( boxBC, {x:0,y:1} )  
         }

    }

}