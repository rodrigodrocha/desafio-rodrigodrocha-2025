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
    if (!verificandoAnimais){
      console.log(" erro: 'Animal inválido'")
      return { erro: 'Animal inválido'  }
    }
    else{
      // const elista = Array.isArray(listaOrdemAnimais)
      // if (elista){
      for (const nome of listaOrdemAnimais){
        const brinquedosDicionario = this.animais[nome]['brinquedos']
        const especie = this.animais[nome]["especie"]
        const verificandoBrinquedos = this.verificaBrinquedos(listaBrinquedosPessoa1, listaBrinquedosPessoa2, brinquedosDicionario, especie, nome)
      } // fim do for percorrendo os brinquendos de cada animal da lista de animal.
      // } fim do if (elista)
    } //fim do else que os nomes dos animais estão todos corretos.
    
  }

  //Método que mostra as lista de brinquedos do animal e os brinquedos que o usuário inseriu
  verificaBrinquedos(brinquedosPessoa1, brinquedosPessoa2, brinquedosDic, especie, nome){
    let situacaoPessoa1 = this.aptaAdocao(brinquedosPessoa1, brinquedosDic)
    let situacaoPessoa2 = this.aptaAdocao(brinquedosPessoa2, brinquedosDic)
    if (!situacaoPessoa1 && !situacaoPessoa2) {
      console.log(nome + " - abrigo")
      return true
    } 
    if (situacaoPessoa1 && !situacaoPessoa2) {
      console.log(nome + " - pessoa 1")
      return true
    } 
    if (!situacaoPessoa1 && situacaoPessoa2) {
      console.log(nome + " - pessoa 2")
      return true
    } else {
      console.log(nome + " - abrigo")
      return true
    }
  } // fim do método verifica brinquedos

  // método se a pessoa esta apta a adoção
  aptaAdocao(brinquedos, brinquedosDic){
    this.j = 0
    for (const brinquedo of brinquedos) {
      if (brinquedo == brinquedosDic[this.j]) {
        this.j++
      }
    }
    if (this.j == brinquedosDic.length){
      return true
    }
    return false
  }
  
  //método para vericar se o nome do animal inserido pelo usuário existe na lista de animal do abrigo
  verificaAnimal(animal) {
    const tamanhoDicionario = Object.keys(this.animais).length;
    //Verificando se tem nome duplicado de animal.
    const temNomeDuplicado = this.eDuplicado(animal)
    if (temNomeDuplicado){
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
