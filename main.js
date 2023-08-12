var locked = false;

/*
b - building
c - cooperation (external work)
d - defence
e - ministry of education
f - fabric
g - grass (empty)
p - parliament
s - school
r - road
*/

class platform{
    constructor(pos){
        this.pos = new vec2(pos.x, pos.y);
        this.claim = 0;
        this.func = "g";
    }
}

class state{
    constructor(claimnm){
        this.claimnm = claimnm;
        this.territories = 0;
        this.hadterritories = false;
        this.population = 0;
        this.hqwork = 0;
        this.lqwork = 0;
        this.economicgrowth = 0;
        this.budget = 100;
        this.enableed = false;
        this.enablede = false;
    }
}

var eng = new Engine("#render", standartPostProces, 0.15, 4000);

var myclnm = 1;

var clclnm = 1;

var cid = 0;

var manid = -1;

var switchfunc = "g";

var curradn = 0;

var applych = false;

var states = new Array(4);

var sp = false;

var gbeg = false;

var peer;

var conn;

function begsp(){
    myclnm = 1;
    sp = true;
}

var pusher;

var channel;

class ltile{
    constructor(){
        this.lid = -1;
        this.type = "g";
    }
}

var pa = new Array(100);

var lastmod = new ltile();

function conmp(){
    var cid = document.getElementById("cid").value;
    if(cid.length === 0){
        alert("please enter ip of the server you want ot connect" );
    }else{
        const websocket = new WebSocket('ws://'+cid);
        websocket.onopen = () => {
            document.getElementById("con").style.display = "none";
            document.getElementById("cid").style.display = "none";
            document.getElementById("ti").style.display = "none";
            document.getElementById("bp").style.display = "none";
            document.getElementById("pb").style.display = "none";
        };
        websocket.onerror = () => {
            alert("connection error");
            setTimeout(function(){
                window.location.reload();
              });
        };
        websocket.onclose = () => {
            alert("connection closed");
            setTimeout(function(){
                window.location.reload();
              });
        };
        websocket.onmessage = (event) => {
            const revd = event.data.split('=');
            if(revd[0] === "id"){
                myclnm = Number(revd[1]);
                switch(revd[1]){
                    case "1":
                        eng.pos.z = 40.0;
                        eng.pos.x = 40.0;
                        break;
                    case "2":
                        eng.pos.z = 40.0;
                        eng.pos.x = -40.0;
                        break;
                    case "3":
                        eng.pos.z = -40.0;
                        eng.pos.x = 40.0;
                        break;
                    case "4":
                        eng.pos.z = -40.0;
                        eng.pos.x = -40.0;
                        break;
                }
                websocket.send('ct='+myclnm+'='+lastmod.lid+'='+lastmod.type);
            }else if(revd[0] === "ct"){
                if(Number(revd[1]) !== -1 && myclnm !== 1){
                    if(pa[Number(revd[1])].claim === myclnm){
                        states[myclnm-1].territories -= 1;
                        switch(pa[Number(revd[1])].func){
                            case "b":
                                states[myclnm-1].population -= 2;
                                break;
                            case "s":
                                states[myclnm-1].hqwork -= 1;
                                break;
                            case "f":
                                states[myclnm-1].lqwork -= 1;
                                break;
                        }
                    }
                    pa[Number(revd[1])].claim = 1;
                    pa[Number(revd[1])].func = revd[2];
                }

                if(Number(revd[3]) !== -1 && myclnm !== 2){
                    if(pa[Number(revd[3])].claim === myclnm){
                        states[myclnm-1].territories -= 1;
                        switch(pa[Number(revd[3])].func){
                            case "b":
                                states[myclnm-1].population -= 2;
                                break;
                            case "s":
                                states[myclnm-1].hqwork -= 1;
                                break;
                            case "f":
                                states[myclnm-1].lqwork -= 1;
                                break;
                        }
                    }
                    pa[Number(revd[3])].claim = 2;
                    pa[Number(revd[3])].func = revd[4];
                }

                if(Number(revd[5]) !== -1 && myclnm !== 3){
                    if(pa[Number(revd[5])].claim === myclnm){
                        states[myclnm-1].territories -= 1;
                        switch(pa[Number(revd[5])].func){
                            case "b":
                                states[myclnm-1].population -= 2;
                                break;
                            case "s":
                                states[myclnm-1].hqwork -= 1;
                                break;
                            case "f":
                                states[myclnm-1].lqwork -= 1;
                                break;
                        }
                    }
                    pa[Number(revd[5])].claim = 3;
                    pa[Number(revd[5])].func = revd[6];
                }

                if(Number(revd[7]) !== -1 && myclnm !== 4){
                    if(pa[Number(revd[7])].claim === myclnm){
                        states[myclnm-1].territories -= 1;
                        switch(pa[Number(revd[7])].func){
                            case "b":
                                states[myclnm-1].population -= 2;
                                break;
                            case "s":
                                states[myclnm-1].hqwork -= 1;
                                break;
                            case "f":
                                states[myclnm-1].lqwork -= 1;
                                break;
                        }
                    }
                    pa[Number(revd[7])].claim = 4;
                    pa[Number(revd[7])].func = revd[8];
                }
                websocket.send('ct='+myclnm+'='+lastmod.lid+'='+lastmod.type);
                lastmod.lid = -1;
                lastmod.type = "g";
            }
        };
    }
}

var tlc = false;

function tlact(){
    tlc = true;
}
function swmn(newf){
    if(newf !== "ad" && states[myclnm-1].budget >= 10){
        switchfunc = newf;
        if(newf === "b"){
            states[myclnm-1].population += 2;
        }
        if(newf === "s"){
            states[myclnm-1].hqwork += 1;
        }
        if(newf === "f"){
            states[myclnm-1].lqwork += 1;
        }
        states[myclnm-1].budget -= 10;
    }else{
        if(states[myclnm-1].budget >= 10){
            switch(curradn){
                case 0:
                    switchfunc = "p";
                    break;
                case 1:
                    switchfunc = "e";
                    states[myclnm-1].enableed = true;
                    break;
                case 2:
                    switchfunc = "d";
                    states[myclnm-1].enablede = true;
                    break;
            }
            states[myclnm-1].budget -= 10;
        }
        curradn += 1;
    }
    applych = true;
}

function main(){
    if(nb === false){
        document.getElementById("con").style.display = "none";
        document.getElementById("cid").style.display = "none";
    }
    const speed = 0.2;
    eng.useorthosh = true;
    eng.sfar = 200.0;
    eng.sfov = 30.0;
    eng.playerphysics = false;
    eng.pos.y = -15;
    eng.camsize.y = 100;
    eng.camsize.x = 0.1;
    eng.camsize.z = 0.1;
    eng.rot.y = eng.toRadians(90);
    function key_callback(){
        document.addEventListener('keydown', function(event) {
            if (event.key == "w" || event.key == "W") {
                eng.pos.z += speed;
            }
            if (event.key == "a" || event.key == "A") {
                eng.pos.x += speed;
            }
            if (event.key == "s" || event.key == "S") {
                eng.pos.z -= speed;
            }
            if (event.key == "d" || event.key == "D") {
                eng.pos.x -= speed;
            }
        }, true);
    }

    eng.useortho = true;

    var cubem = new cubeMap(right, left, ttop, bottom, back, front, 512, 512, eng);
    
    var sky = new Mesh(skyv, skyn, skyu, standartSkyboxShaderFragment, standartSkyboxShaderVertex, eng, null, null, null, 1, 1, false, cubem);
    sky.cullmode = eng.gl.FRONT;
    sky.rot.y = 3.0;
    sky.scale = new vec3(1000, 1000, 1000);

    var b = new Mesh(bv, bn, bu, standartFragmentShader, standartVertexShader, eng, m, s, n, mx, my, false, cubem);

    var d = new Mesh(dv, dn, du, standartFragmentShader, standartVertexShader, eng, m, s, n, mx, my, false, cubem);

    var e = new Mesh(ev, en, eu, standartFragmentShader, standartVertexShader, eng, m, s, n, mx, my, false, cubem);

    var f = new Mesh(fv, fn, fu, standartFragmentShader, standartVertexShader, eng, m, s, n, mx, my, false, cubem);

    var g = new Mesh(gv, gn, gu, standartFragmentShader, standartVertexShader, eng, m, s, n, mx, my, false, cubem);

    var p = new Mesh(pv, pn, pu, standartFragmentShader, standartVertexShader, eng, m, s, n, mx, my, false, cubem);

    var sm = new Mesh(sv, sn, su, standartFragmentShader, standartVertexShader, eng, m, s, n, mx, my, false, cubem);

    var r = new Mesh(rv, rn, ru, standartFragmentShader, standartVertexShader, eng, m, s, n, mx, my, false, cubem);

    var pawn = new Mesh(pawnv, pawnn, pawnu, standartFragmentShader, standartVertexShader, eng, m, s, n, mx, my, false, cubem);

    var cur = 0;
    for(var y = -5; y != 5; y+=1){
        for(var x = -5; x != 5; x+=1){
            pa[cur] = new platform(new vec2(x*10, y*10));
            console.log(pa[cur].func);
            cur += 1;
        }
    }

    eng.shadowpos.z = -60.0;
    eng.shadowpos.x = -60.0;
    eng.shadowpos.y = -40.7;
    eng.shadowrot.y = 0.7;
    eng.shadowrot.x = -0.7;
    eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);

    states[0] = new state(1);
    states[1] = new state(2);
    states[2] = new state(3);
    states[3] = new state(4);

    var bott = 0;
    
    var botcf = "p";

    var waitfb = 0;

    var resolution = new vec2(eng.canvas.width, eng.canvas.height);
    var x, y;
    var stillt = false;
    var touchHandler = function(event) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    }
    var begtouch = function() {
        stillt = true;
    }
    var endtouch = function() {
        stillt = false;
    }
    eng.canvas.addEventListener("touchmove", touchHandler);
    eng.canvas.addEventListener("touchstart", begtouch);
    eng.canvas.addEventListener("touchend", endtouch);

    var touchpos;

    key_callback();
    drawFrame();
    function drawFrame(now){
        eng.fov = Number(document.getElementById("zm").value);
        document.getElementById("bd").innerHTML = "Budget: " + states[myclnm-1].budget;
        pawn.pos.x = -eng.pos.x;
        pawn.pos.z = -eng.pos.z;
        eng.shadowpos.z = eng.pos.z - 45.0;
        eng.shadowpos.x = eng.pos.x - 45.0;

        if(sp === true){
            for(var i = 0; i != 2; i+=1){
                if(states[i].lqwork === states[i].hqwork && states[i].hqwork === states[i].population/2 && states[i].lqwork === states[i].population/2){
                    states[i].budget += 10 * states[i].hqwork;
                }else{
                    if(states[i].population !== 0 && (states[i].lqwork !== 0 || states[i].hqwork !== 0)){
                        states[i].budget += 1;
                    }
                }
            }
            if(gbeg === true && waitfb >= eng.fps){
                if(pa[bott].claim === 1){
                    states[0].territories -= 1;
                    switch(pa[bott].func){
                        case "b":
                            states[0].population -= 2;
                            break;
                        case "f":
                            states[0].lqwork -= 1;
                            break;
                        case "s":
                            states[0].hqwork -= 1;
                            break;
                    }
                }
                pa[bott].claim = 2;
                pa[bott].func = botcf;
                states[1].budget -= 10;
                switch(botcf){
                    case "p":
                        botcf = "e";
                        break;
                    case "e":
                        botcf = "d";
                        break;
                    case "d":
                        botcf = "b";
                        break;
                    case "b":
                        botcf = "f";
                        break;
                    case "f":
                        botcf = "s";
                        break;
                    case "s":
                        botcf = "b";
                        break;
                }
                bott += 1;
                waitfb = 0;
                if(bott >= cur){
                    bott = 0;
                }
            }else{
                waitfb += 1;
            }
        }else{
            if(states[myclnm-1].lqwork === states[myclnm-1].hqwork && states[myclnm-1].hqwork === states[myclnm-1].population/2 && states[myclnm-1].lqwork === states[myclnm-1].population/2){
                states[myclnm-1].budget += 10 * states[myclnm-1].hqwork;
            }else{
                if(states[myclnm-1].population !== 0 && (states[myclnm-1].lqwork !== 0 || states[myclnm-1].hqwork !== 0)){
                    states[myclnm-1].budget += 1;
                }
            }
        }

        eng.beginShadowPass();

        for(var i = 0; i != 100; i += 1){
            switch(pa[i].func){
                case "b":
                    b.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    b.Draw(eng);
                    break;
                case "d":
                    d.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    d.Draw(eng);
                    break;
                case "e":
                    e.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    e.Draw(eng);
                    break;
                case "f":
                    f.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    f.Draw(eng);
                    break;
                case "g":
                    g.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    g.Draw(eng);
                    break;
                case "p":
                    p.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    p.Draw(eng);
                    break;
                case "s":
                    sm.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    sm.Draw(eng);
                    break;
                case "r":
                    r.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    r.Draw(eng);
                    break;
            }
        }
        pawn.Draw(eng);

        eng.beginFrame();

        touchpos = new vec2(x, y);
        if(stillt === true){
            eng.pos.z -= (((touchpos.y/resolution.y)*2)-1)*0.05;
            eng.pos.x -= (((touchpos.x/resolution.x)*2)-1)*0.1;
        }

        sky.Draw(eng);

        for(var i = 0; i != 100; i += 1){
            switch(pa[i].func){
                case "b":
                    b.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    if(pa[i].claim === myclnm){
                        eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
                        b.collision = false;
                        b.Draw(eng);
                    }else{
                        switch(pa[i].claim){
                            case 1:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 0.1, 0.1), 1);
                                break;
                            case 2:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 1, 0.1), 1);
                                break;
                            case 3:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 1), 1);
                                break;
                            case 4:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 0.1), 1);
                                break;
                        }
                        if(states[myclnm-1].enablede){
                            b.collision = false;
                            b.Draw(eng);
                            if(b.interacting && tlc && states[myclnm-1].budget >= 50){
                                pa[i].claim = myclnm;
                                pa[i].func = "g";
                                states[myclnm-1].budget -= 50;
                                states[myclnm-1].territories += 1;
                                states[pa[i].claim-1].territories -= 1;
                                states[pa[i].claim-1].population -= 2;
                                lastmod.type = "g";
                                lastmod.lid = i;
                            }
                        }else{
                            b.collision = true;
                            b.Draw(eng);
                        }
                    }
                    b.collision = false;
                    break;
                case "d":
                    d.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    if(pa[i].claim === myclnm){
                        eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
                        d.collision = false;
                        d.Draw(eng);
                    }else{
                        switch(pa[i].claim){
                            case 1:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 0.1, 0.1), 1);
                                break;
                            case 2:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 1, 0.1), 1);
                                break;
                            case 3:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 1), 1);
                                break;
                            case 4:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 0.1), 1);
                                break;
                        }
                        if(states[myclnm-1].enablede){
                            d.collision = false;
                            d.Draw(eng);
                            if(d.interacting && tlc && states[myclnm-1].budget >= 50){
                                pa[i].claim = myclnm;
                                pa[i].func = "g";
                                states[myclnm-1].budget -= 50;
                                states[myclnm-1].territories += 1;
                                states[pa[i].claim-1].territories -= 1;
                                lastmod.type = "g";
                                lastmod.lid = i;
                            }
                        }else{
                            d.collision = true;
                            d.Draw(eng);
                        }
                    }
                    d.collision = false;
                    break;
                case "e":
                    e.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    if(pa[i].claim === myclnm){
                        eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
                        e.collision = false;
                        e.Draw(eng);
                    }else{
                        switch(pa[i].claim){
                            case 1:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 0.1, 0.1), 1);
                                break;
                            case 2:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 1, 0.1), 1);
                                break;
                            case 3:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 1), 1);
                                break;
                            case 4:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 0.1), 1);
                                break;
                        }
                        if(states[myclnm-1].enablede){
                            e.collision = false;
                            e.Draw(eng);
                            if(e.interacting && tlc && states[myclnm-1].budget >= 50){
                                pa[i].claim = myclnm;
                                pa[i].func = "g";
                                states[myclnm-1].budget -= 50;
                                states[myclnm-1].territories += 1;
                                states[pa[i].claim-1].territories -= 1;
                                lastmod.type = "g";
                                lastmod.lid = i;
                            }
                        }else{
                            e.collision = true;
                            e.Draw(eng);
                        }
                    }
                    e.collision = false;
                    break;
                case "f":
                    f.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    if(pa[i].claim === myclnm){
                        eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
                        f.collision = false;
                        f.Draw(eng);
                    }else{
                        switch(pa[i].claim){
                            case 1:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 0.1, 0.1), 1);
                                break;
                            case 2:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 1, 0.1), 1);
                                break;
                            case 3:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 1), 1);
                                break;
                            case 4:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 0.1), 1);
                                break;
                        }
                        if(states[myclnm-1].enablede){
                            f.collision = false;
                            f.Draw(eng);
                            if(f.interacting && tlc && states[myclnm-1].budget >= 50){
                                pa[i].claim = myclnm;
                                pa[i].func = "g";
                                states[myclnm-1].budget -= 50;
                                states[myclnm-1].territories += 1;
                                states[pa[i].claim-1].territories -= 1;
                                states[pa[i].claim-1].lqwork -= 1;
                                lastmod.type = "g";
                                lastmod.lid = i;
                            }
                        }else{
                            f.collision = true;
                            f.Draw(eng);
                        }
                    }
                    f.collision = false;
                    break;
                case "g":
                    g.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    if(pa[i].claim === 0 || pa[i].claim === myclnm){
                        if(pa[i].claim === myclnm){
                            eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
                        }
                        g.collision = false;
                        g.Draw(eng);
                        if(pa[i].claim === 0 && tlc === true && g.interacting === true){
                            pa[i].claim = myclnm;
                            gbeg = true;
                        }
                        if(tlc === true && g.interacting === true){
                            document.getElementById("db").style.display = "initial";
                            document.getElementById("t1").style.display = "initial";
                            document.getElementById("t1").innerHTML = "Build on tile:";
                            switch(curradn){
                                case 0:
                                    document.getElementById("b1").style.display = "initial";
                                    document.getElementById("b1").innerHTML = "parliament";
                                    break;
                                case 1:
                                    document.getElementById("b1").style.display = "initial";
                                    document.getElementById("b1").innerHTML = "Ministry of Culture";
                                    break;
                                case 2:
                                    document.getElementById("b1").style.display = "initial";
                                    document.getElementById("b1").innerHTML = "Ministry of Defence";
                                    break;
                            }
                            document.getElementById("b2").style.display = "initial";
                            if(states[myclnm-1].enableed === true){
                                document.getElementById("b3").style.display = "initial";
                            }
                            document.getElementById("b4").style.display = "initial";
                            document.getElementById("b5").style.display = "initial";
                            document.getElementById("cl").style.display = "initial";
                            manid = i;
                            states[myclnm-1].territories += 1;
                            states[myclnm-1].hadterritories = true;
                            lastmod.type = "g";
                            lastmod.lid = i;
                        }
                    }else{
                        switch(pa[i].claim){
                            case 1:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 0.1, 0.1), 1);
                                break;
                            case 2:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 1, 0.1), 1);
                                break;
                            case 3:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 1), 1);
                                break;
                            case 4:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 0.1), 1);
                                break;
                        }
                        if(states[myclnm-1].enablede){
                            g.collision = false;
                            if(g.interacting && tlc && states[myclnm-1].budget >= 50){
                                pa[i].claim = myclnm;
                                states[myclnm-1].budget -= 50;
                                states[myclnm-1].territories += 1;
                                states[pa[i].claim-1].territories -= 1;
                                lastmod.type = "g";
                                lastmod.lid = i;
                            }
                        }else{
                            g.collision = true;
                        }
                        g.Draw(eng);
                    }
                    g.collision = false;
                    break;
                case "p":
                    p.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    if(pa[i].claim === myclnm){
                        eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
                        p.collision = false;
                        p.Draw(eng);
                    }else{
                        switch(pa[i].claim){
                            case 1:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 0.1, 0.1), 1);
                                break;
                            case 2:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 1, 0.1), 1);
                                break;
                            case 3:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 1), 1);
                                break;
                            case 4:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 0.1), 1);
                                break;
                        }
                        if(states[myclnm-1].enablede){
                            p.collision = false;
                            p.Draw(eng);
                            if(p.interacting && tlc && states[myclnm-1].budget >= 50){
                                pa[i].claim = myclnm;
                                pa[i].func = "g";
                                states[myclnm-1].budget -= 50;
                                states[myclnm-1].territories += 1;
                                states[pa[i].claim-1].territories -= 1;
                                lastmod.type = "g";
                                lastmod.lid = i;
                            }
                        }else{
                            p.collision = true;
                            p.Draw(eng);
                        }
                    }
                    p.collision = false;
                    break;
                case "s":
                    sm.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    if(pa[i].claim === myclnm){
                        eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
                        sm.collision = false;
                        sm.Draw(eng);
                    }else{
                        switch(pa[i].claim){
                            case 1:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 0.1, 0.1), 1);
                                break;
                            case 2:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 1, 0.1), 1);
                                break;
                            case 3:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 1), 1);
                                break;
                            case 4:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 0.1), 1);
                                break;
                        }
                        if(states[myclnm-1].enablede){
                            sm.collision = false;
                            sm.Draw(eng);
                            if(sm.interacting && tlc && states[myclnm-1].budget >= 50){
                                pa[i].claim = myclnm;
                                pa[i].func = "g";
                                states[myclnm-1].budget -= 50;
                                states[myclnm-1].territories += 1;
                                states[pa[i].claim-1].territories -= 1;
                                states[pa[i].claim-1].hqwork -= 1;
                                lastmod.type = "g";
                                lastmod.lid = i;
                            }
                        }else{
                            sm.collision = true;
                            sm.Draw(eng);
                        }
                    }
                    sm.collision = false;
                    break;
                case "r":
                    r.pos = new vec3(pa[i].pos.x, 0, pa[i].pos.y);
                    if(pa[i].claim === myclnm){
                        eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
                        r.collision = false;
                        r.Draw(eng);
                    }else{
                        switch(pa[i].claim){
                            case 1:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 0.1, 0.1), 1);
                                break;
                            case 2:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 1, 0.1), 1);
                                break;
                            case 3:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 1), 1);
                                break;
                            case 4:
                                eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 0.1), 1);
                                break;
                        }
                        if(states[myclnm-1].enablede){
                            r.collision = false;
                            r.Draw(eng);
                            if(r.interacting && tlc && states[myclnm-1].budget >= 50){
                                pa[i].claim = myclnm;
                                states[myclnm-1].budget -= 50;
                                states[myclnm-1].territories += 1;
                                states[pa[i].claim-1].territories -= 1;
                                lastmod.type = "r";
                                lastmod.lid = i;
                            }
                        }else{
                            r.collision = true;
                            r.Draw(eng);
                        }
                    }
                    r.collision = false;
                    break;
            }
            eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 0.1), 1);
        }

        eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
        pawn.Draw(eng);

        eng.setLight(0, new vec3(0, 1, 1), new vec3(0.1, 0.1, 0.1), 1);

        tlc = false;
        if(eng.pos.z < -45){
            eng.pos.z = -45;
        }
        if(eng.pos.x < -45){
            eng.pos.x = -45;
        }
        if(eng.pos.z > 55){
            eng.pos.z = 55;
        }
        if(eng.pos.x > 55){
            eng.pos.x = 55;
        }

        if(applych && states[clclnm-1].budget >= 10){
            pa[manid].func = switchfunc;
            lastmod.type = switchfunc;
            lastmod.lid = manid;
            manid = -1;
            applych = false;
        }

        if(states[myclnm-1].hadterritories === true && states[myclnm-1].territories <= 0){
            alert("you lost!");
            setTimeout(function(){
                window.location.reload();
              });
        }

        if(states[myclnm-1].territories >= cur){
            alert("Victory!");
            setTimeout(function(){
                window.location.reload();
              });
        }

        eng.endFrame(drawFrame, now);
    }
}

window.onload = main;