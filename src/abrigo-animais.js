class AbrigoAnimais {

  constructor(){
    this.iDicionario = 0
    this.iUsuario = 0
    this.j = 0
    this.SituacaoFinalDoAnimal = []
    this.animais = {
      rex : {
        especie : "cao",
        brinquedos : ["rato", 'bola']
      },
      mimi : {
        especie : "gato",
        brinquedos : ["bola", "laser"]
      },
      fofo : {
        especie : "gato",
        brinquedos : ["bola", "rato", "laser"]
      },
      zero : {
        especie : "gato", 
        brinquedos : ["rato", "bola"]
      },
      bola : {
        especie : "cao", 
        brinquedos : ["caixa", "novelo"]
      },
      bebe : {
        especie : "cao",
        brinquedos : ["laser", "rato", "bola"]
      },
      loco : {
        especie : "jabuti", 
        brinquedos : ["skate", "rato"]
      }
    }
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // verificar se o nome do animal fornecido existe na lista de animal do abrigo
    let listaBrinquedosPessoa1 = this.transformaLista(brinquedosPessoa1)
    let listaBrinquedosPessoa2 = this.transformaLista(brinquedosPessoa2)
    let listaOrdemAnimais = this.transformaLista(ordemAnimais)
    const verificandoAnimais = this.verificaAnimal(listaOrdemAnimais)
    const elista = Array.isArray(listaOrdemAnimais)
    if (elista && verificandoAnimais){
      for (const nome of listaOrdemAnimais){
        const brinquedosDicionario = this.animais[nome]['brinquedos']
        const especie = this.animais[nome]["especie"]
        const verificandoBrinquedos = this.verificaBrinquedos(listaBrinquedosPessoa1, listaBrinquedosPessoa2, brinquedosDicionario, especie)
      }
    } 
  }

  //Método que mostra as lista de brinquedos do animal e os brinquedos que o usuário inseriu
  verificaBrinquedos(brinquedosPessoa1, brinquedosPessoa2, brinquedosDic, especie){
    console.log(brinquedosPessoa1)
    console.log(brinquedosPessoa2)
    console.log(brinquedosDic)
    console.log("Gato ou Cão: " + especie)


  }
  
  //método para vericar se o nome do animal inserido pelo usuário existe na lista de animal do abrigo
  verificaAnimal(animal) {
    const tamanhoDicionario = Object.keys(this.animais).length;
    //Verificando se tem nome duplicado de animal.
    const temNomeDuplicado = this.eDuplicado(animal)
    if (temNomeDuplicado){
      console.log(" erro: 'Animal inválido'");
      return false;
    }
    const tamanhoListaUsuarios = animal.length
      for (const nomeAnimal of animal){
        this.iDicionario = 0;
        for (const chave in this.animais){
          this.iDicionario++;
          if (nomeAnimal == chave){
            break;
          }
          if (tamanhoDicionario == this.iDicionario){
            this.j = 1;
          }
        }
        if (this.j == 1) {
          console.log(" erro: 'Animal inválido'");
          return false;
        }
        this.iUsuario++
        if (this.iUsuario == tamanhoListaUsuarios) {
          return true;
        }
      }
  }
  //verifica se tem dados duplicados. Exemplo brinquedo ou nome de animal
  eDuplicado(lista) {
    return (new Set(lista)).size < lista.length;
  }
  //transforma tudo em minusculo
  transformaLista(a){
    let lista = a.split(",")
    lista = lista.map(p => p.toLowerCase())
    return lista
  }
  
}

export { AbrigoAnimais };
