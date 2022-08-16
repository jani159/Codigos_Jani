pragma solidity 0.8.1; //Congelando versão do solidity

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract Color is ERC721Enumerable{

    string [] public colors;
    /*
    Verifica se a cor que foi passada já existe na lista de cores.

    Isso vai ajudar a garantir que a mesma cor não seja salva mais
    de uma vez.
    */
    mapping (string => bool) _colorExists; 

    constructor() ERC721("Color", "COLOR") public {

    }

    // o "_" significa que a variável é local
    function mint (string memory _color) public {
        /*
            Require unique color
            Color - add it
            Call the mint function
            Color - track it
        */

        //"require" quando é "true" não faz nada,mas quando é falso, lança uma exceção
        require(!_colorExists[_color]);
        colors.push(_color);
        uint _id = colors.length - 1;

        /*
        "_mint" está no arquivo "ERC721.sol".

        o parâmetro "msg.sender" permite com que seja possível 
        ver o "etherium address" da pessoa que fez a requisição.

        "_id" será o token id utilizado
        */
        _mint(msg.sender, _id);
        _colorExists[_color] = true;
    }

}