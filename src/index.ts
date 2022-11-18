import * as crypto from "crypto";
//npm i -D @types/node
//Definitely Typed오류 해결

interface BlockShape {
    hash: string;
    prevHash:string;
    height:number;
    data:string;
}

class Block implements BlockShape {
    public hash:string
    constructor(
        public prevHash:string,
        public height:number,
        public data:string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash:string, height:number, data:string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class Blockchain {
    private blocks: Block[]
    constructor() {
        this.blocks = [];
    }
    private getPrevHash() {
        if(this.blocks.length===0) return "";
        return this.blocks[this.blocks.length-1].hash;
    }
    public addBlock(data:string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length+1, data); //새로운 블록 생성
        this.blocks.push(newBlock);
    }
    public getBlocks() {
        return [...this.blocks];
    }
}

const blockchain = new Blockchain();
blockchain.addBlock("First One");
blockchain.addBlock("Second One");
blockchain.addBlock("Third One");
console.log(blockchain.getBlocks());


// npm i -D ts-node : 이게 있으면 빌드없이 타입스크립트를 실행할 수 있게 해준다
//Definitely Typed : 타입 정의들로만 이루어진 깃 레포지토리. npm에 존재하는 거의 모든 패키지들



