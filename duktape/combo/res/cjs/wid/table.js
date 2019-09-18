{
	var Node=require('cjs/wid/node.js?table');//fake copy for inheritance
	var Container=require('cjs/wid/container.js');
	var Anchor=require('cjs/wid/anchor.js');
	var table=Node;
	nodename='div';
	table.prototype.src='res/cjs/ses/table.js';
	table.prototype.nodename='div';
	table.prototype.init=function(){
		this.rows=[];
		this.nrows=10;
		this.curidx=0;
		return this;
	}
	table.prototype.setData=function(a){
		var Dbo=require('cjs/db/dbo.js');
		var dbo=new Dbo();
		dbo.setup({'db':'','tbl':''});
		this.data=a;
		var _this=this;

		this.pagination=this.addChild(new Node(),'pagination')
			.setNodeName('div')
			.addChild(new Container(),'msg')
		;
		this.pagination.addChild(new Anchor())//dont this.prev, messes up ctx
			.setText('prev')
			.addAttribute('class','btn btn-default')
			.setCmd('home')
			.setCtx(this)
			.setOnClick(
				function(){
					console.log('/////// <  /////////')
					try{
					(this.ctx.curidx-this.ctx.nrows)>=0?this.ctx.curidx-=this.ctx.nrows:null;

					console.log(this.ctx.curidx);//this.ctx.pagination.hide();//.getChild('msg').setText(this.ctx.curidx);
					var _this=this;
					this.ctx.rows.forEach(
						function(r,ri){
							ri<_this.ctx.curidx||ri>_this.ctx.curidx+_this.ctx.nrows?r.hide():r.show();
						}
					);

					}catch(e){
						console.log(e.toString());
					}
					console.log('/////// <  /////////')
				}
			)
		;
		this.pagination.addChild(new Anchor())//dont this.next , messes up ctx
			.setText('next')
			.addAttribute('class','btn btn-default pull-right')
			.setCmd('home')
			.setCtx(this)
			.setOnClick(
				function(){
					console.log('/////// >  /////////');
					(this.ctx.curidx+this.ctx.nrows)<this.ctx.data.length?this.ctx.curidx+=this.ctx.nrows:null;
					console.log(this.ctx.curidx);//this.ctx.pagination.hide();//.getChild('msg').setText(this.ctx.curidx);
					var _this=this;
					this.ctx.rows.forEach(
						function(r,ri){
							ri<_this.ctx.curidx||ri>_this.ctx.curidx+_this.ctx.nrows?r.hide():r.show();
						}
					);
					console.log('/////// >  /////////');
				}
			)
		;
		var tbl=this.addChild(new Node(),'table')
			.setNodeName('table')
			.addAttribute('class','table table-striped tabled-sm')
		;
		var idx=0;
		this.data.forEach(
			function(b,c){
				var tr=tbl.addChild(new Node())
					.setNodeName('tr')
				;
				b.forEach(
					function(d,e){
						var td=tr.addChild(new Node())
							.setNodeName('td')
							.setText(d.toString())
						;
					}
				);
				idx<_this.nrows+1?tr.show():tr.hide();
				_this.rows.push(tr);
				idx++;
			}
		);
		return this;
	}
	module.exports=table;
}
