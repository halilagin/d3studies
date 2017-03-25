import React, {Component} from 'react';
import * as d3 from 'd3';


export class ProgHist extends Component {



    render() {
        return (
            <div>

            </div>
        );
    }


    componentWillReceiveProps(props) {
        let ages = [1, 5, 10, 12, 35, 75, 68, 2, 7, 10, 55, 40, 42, 86, 39, 16, 47, 61, 9, 14, 1, 5, 10, 10, 12, 35, 75, 64, 22, 28, 2, 7, 21, 59, 43, 42, 83, 39, 18, 47, 59, 8, 15];
        this.setState({name: props.name});
        this.setState({"ages":ages});
        alert(this.getState("ages"));

    }


    sortArr(arr_){
        for (var i=0;i<arr_.length;i++){
            for(var j=0;j<arr_.length-1;j++){
                if (arr_[j]>arr_[j+1]) {
                    let temp = arr_[j];
                    arr_[j]=arr_[j+1];
                    arr_[j+1]=temp;
                }
            }
        }
    }

    getBins(binNumber, arr_){
        let bins = [];

        this.sortArr(arr_);

        let minValue = arr_[0];
        let maxValue = arr_[arr_.length-1];
        let barRange = (maxValue-minValue)/binNumber;
        for (var i=0;i<binNumber;i++){
            let range  = [i*barRange, (i+1)*barRange];
            let barValues = [];
            for (var j=0;j<arr_.length;j++){
                if (arr_[j]>=range[0] && arr_[j]<=range[1])
                    barValues.push(arr_[j]);
            }
            bins.push(barValues);
        }

        //console.log(bins);

    }

     myrand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    progHist(ages  ){
        let timeInterval=3000;

        var width=800, height=500, padding=50;
        var sx = d3.scale.linear()
            .domain([0, d3.max(ages)])
            .range([0,width]);
        let canvas = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height",height+padding)
            .append("g")
            .attr("transform", "translate(20,20)")
            ;
        let randFn25 = d3.random.normal(25,5);
        let randFn50 = d3.random.normal(50,5);
        let randFn75 = d3.random.normal(75,5);


        setInterval(()=>{
            let chooseRand = this.myrand(0,2);
            let pieIdx = this.myrand(0,20);

            canvas.selectAll("*").remove();

            for (var i=0;i<10;i++){
                let r=0;
                if (chooseRand==0)
                    r = Math.round(randFn25());
                else if (chooseRand==1)
                    r = Math.round(randFn50());
                else if (chooseRand==2)
                    r = Math.round(randFn75());

                ages.push(r);
            }

            let hist = d3.layout.histogram();
            let bins = hist.bins(30)(ages);
            var sy = d3.scale.linear()
                .domain([0, d3.max(bins.map(d=>d.y))])
                .range([0, height]);
            //this.getBins(5,this.ages);

            let histVerLines =[{
                "x1":1,
                "y1":0,
                "x2":bins[0].x,
                "y2":bins[0].y
            }];
            for (var i=0;i<bins.length-1;i++) {
                histVerLines.push({
                    "x1":bins[i].x+bins[i].dx,
                    "y1":bins[i].y,
                    "x2":bins[i+1].x,
                    "y2":bins[i+1].y
                });
            }

            var bars = canvas.selectAll(".histhorline")
                    .data(bins)
                    .enter()
                    .append("g")
                ;
            let scale = 5;
            bars.append("line")
                .classed("histhorline",true)
                .attr("x1", d=>sx(d.x) )
                .attr("y1", d=>height-sy(d.y))
                .attr("x2", d=>sx(d.x+d.dx))
                .attr("y2", d=>height-sy(d.y))
                .attr("fill", "none")
                .attr("stroke", "#33aade")
                .attr("stroke-width", "3");



            let gXaxis = d3.svg.axis().scale(sx).orient("bottom");
            canvas.append("g")
                .call(gXaxis)
                .attr("transform", "translate(5,"+(height+5)+")");

            bars.append("text")
                .attr("x", d=>sx(d.x))
                .attr("y", d=>height-sy(d.y))
                .attr("dx", d=>sx(d.dx)/2)
                .attr("text-anchor", "middle")
                .attr("dy",20)
                .attr("fill", "#000000")
                .text(d=>d.y);


            var histverlineG = canvas.selectAll(".histverline")
                    .data(histVerLines)
                    .enter()
                    .append("line")
                    .attr("class", (d,i)=>{return i==((pieIdx+5)%20)?"histverline-dash":"histverline"; })
                    .attr("x1", (d,i)=>sx(d.x1))
                    .attr("y1", (d,i)=>height-sy(d.y1))
                    .attr("x2", (d,i)=>sx(d.x2))
                    .attr("y2", (d,i)=>height-sy(d.y2))
                    .attr("fill", "none")
                    .attr("stroke", (d,i)=>{return i==((pieIdx+5)%20)?"purple":"#33aade"; })
                    .attr("stroke-width", "3")
                ;

            let pie = [sx(bins[pieIdx].x+bins[pieIdx].dx/2), height-sy(bins[pieIdx].y), sx(bins[pieIdx].dx/2), 3];
            let updown = this.myrand(0,1);
            this.drawPie(canvas, pie[0], pie[1], pie[2],pie[3],updown==0?"up":"down", "red");



            let sinIdx = Math.abs(20-pieIdx);
            if (sinIdx==pieIdx)
                sinIdx = ((sinIdx+1)%20);

            let sinus = [sx(bins[sinIdx].x+bins[sinIdx].dx/4), height-sy(bins[sinIdx].y), sx(bins[sinIdx].dx/2), 3];

            this.drawSinus(canvas, sinus[0], sinus[1], sinus[2],sinus[3], "red");
            this.drawBoxplots(bars,sx, sy,height, "red");
        },timeInterval);



    }


    drawBoxplots(bars, sx,sy,height, color){

        // bars.append("text")
        //     .attr("x", d=>sx(d.x))
        //     .attr("y", d=>height-sy(d.y))
        //     .attr("dx", d=>sx(d.dx)/2)
        //     .attr("text-anchor", "middle")
        //     .attr("dy",20)
        //     .attr("fill", "#000000")
        //     .text(d=>d.y);

         bars.append("line")
            .attr("class","boxplot")
            .attr("x1", (d,i)=>sx(d.x+d.dx/2))
            .attr("y1", (d,i)=>height-sy(d.y)-5)
            .attr("x2", (d,i)=>sx(d.x+d.dx/2))
            .attr("y2", (d,i)=>height-sy(d.y)+5)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", "1")
            ;

        bars.append("line")
            .attr("class","boxplottop")
            .attr("x1", (d,i)=>sx(d.x+d.dx/2)-2)
            .attr("y1", (d,i)=>height-sy(d.y)-5)
            .attr("x2", (d,i)=>sx(d.x+d.dx/2)+2)
            .attr("y2", (d,i)=>height-sy(d.y)-5)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", "1")
        ;

        bars.append("line")
            .attr("class","boxplotbottom")
            .attr("x1", (d,i)=>sx(d.x+d.dx/2)-2)
            .attr("y1", (d,i)=>height-sy(d.y)+5)
            .attr("x2", (d,i)=>sx(d.x+d.dx/2)+2)
            .attr("y2", (d,i)=>height-sy(d.y)+5)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", "1")
        ;


    }

    drawPie(canvas, x,y,r,w, dir, color){
        let p = Math.PI *2;
        let group = canvas.append("g").attr("transform", "translate("+x+","+y+")");
        let startAngle_ = dir==="up"?p*0.75:p*0.25;
        let endAngle_ = dir==="up"?p*1.25:p*0.75;
        let arc = d3.svg.arc()
            .innerRadius(r-w)
            .outerRadius(r)
            .startAngle(startAngle_)
            .endAngle(endAngle_);
        group.append("path").attr("d", arc)
            .attr("fill", color);
    }

    drawSinus(canvas, x,y,r,w, color){
        this.drawPie(canvas, x,y, r/2,w, "up",color);
        this.drawPie(canvas, x+r,y, r/2,w, "dow", color);

    }


    componentWillMount() {
        let ages = [1, 5, 10, 12, 35, 75, 68, 2, 7, 10, 55, 40, 42, 86, 39, 16, 47, 61, 9, 14, 1, 5, 10, 10, 12, 35, 75, 64, 22, 28, 2, 7, 21, 59, 43, 42, 83, 39, 18, 47, 59, 8, 15];
        //this.setState({"ages":ages});

        //alert(this.state.ages);
        //this.setState({name: "noname"});
        this.progHist(ages);

        //setInterval(()=>{this.progHist(ages);}, 2000);
        // d3.csv("/public/data/ages.csv", (data)=>{
        //
        // });

        ;
    }
}


