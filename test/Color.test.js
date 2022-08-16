const { assert } = require('chai');

const Color = artifacts.require('./Color.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Color', (accounts) => {

    let contract;

    //Usando o "before" para garantir que o contrato já estará completamente carregado em "contract"
    before(async() => {
        contract = await Color.deployed();
    })
    //Comando "describe" age como um conjunto de testes e cada "it" é um teste que será executado
    describe('deployment', async() => {

        it('deploys successfully' , async() => {
            const address = contract.address;
            console.log("Endereco: "+address);
            //Verificar que o endereço não está vazio
            assert.notEqual(address, 0x0); 
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined); 
        })

        it('has a name', async() => {
            //Método "name" está no arquivo "ERC721.sol" do node_module "openzeppelin"
            const name = await contract.name();
            console.log("Nome: "+name);
            assert.equal(name, 'Color');
        })

        it('has a symbol', async() => {
            //Método "symbol" está no arquivo "ERC721.sol" do node_module "openzeppelin"
            const symbol = await contract.symbol();
            console.log("Símbolo: "+symbol);
            assert.equal(symbol, 'COLOR');
        })
    })

    describe('minting', async() => {

        it('creates a new token', async() => {
            const result = await contract.mint('#EC058E');
            const totalSupply = await contract.totalSupply(); //Retorna quantos tokens existem atualmente
            console.log("Total de Tokens: "+totalSupply);
            //SUCCESS
            assert.equal(totalSupply,1);
            console.log("Log da função mint: ");
            console.log(result);

            const event = result.logs[0].args;
            console.log("Event LOGs: ");
            console.log(event);
            console.log("TokenID: ");
            console.log(event.tokenId.toNumber());
            assert.equal(event.tokenId.toNumber(), 0, 'id is correct');
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct');
            assert.equal(event.to, accounts[0], 'to is correct');


            //FAILURE: cannot mint the same color twice
            await contract.mint('#EC058E').should.be.rejected;
        })
    })


    //Listar todos os tokens que existem
    describe('indexing', async() => {
        let result, totalSupply;

        it('lists colors', async () => {
            //Mint 3 tokens
            await contract.mint('#5386E4');
            await contract.mint('#FFFFFF');
            await contract.mint('#000000');

            const totalSupply = await contract.totalSupply();

            let color;
            let result = [];

            for(var i=1; i<= totalSupply; i++){
                color = await contract.colors(i-1);
                result.push(color);
            }

            let expected = ['#EC058E','#5386E4','#FFFFFF','#000000'];
            //Como comparar arrays pode gerar erros, utilizar o join pode ajudar, pois o converte para string
            assert.equal(result.join(','),expected.join(','), 'list of colors correct');

        })

    })

})