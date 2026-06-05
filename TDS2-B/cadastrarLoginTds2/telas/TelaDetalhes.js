import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');

const imagensProdutos = {
  'Notebook Gamer Pro': [
    require('../assets/imagens/produto1-1.png'),
    require('../assets/imagens/produto1-2.png'),
    require('../assets/imagens/produto1-3.png'),
  ],
  'Smartphone Quantum X': [
    require('../assets/imagens/produto2-1.png'),
    require('../assets/imagens/produto2-2.png'),
    require('../assets/imagens/produto2-3.png'),
  ],
  'Fone Noise Cancelling': [
    require('../assets/imagens/produto3-1.png'),
    require('../assets/imagens/produto3-2.png'),
    require('../assets/imagens/produto3-3.png'),
  ],
  'Smartwatch Sport Fit': [
    require('../assets/imagens/produto4-1.png'),
    require('../assets/imagens/produto4-2.png'),
    require('../assets/imagens/produto4-3.png'),
  ],
};

export default function TelaDetalheProduto({ route, navigation }) {
  const produto = route?.params?.produto || {
    Produto: 'Produto não encontrado',
    Preço: '0',
    ValorNormal: '0',
    Descrição: '',
    Foto: '',
    Foto2: '',
    Foto3: '',
    ValorDesconto: '0',
    Desconto: '',
  };
  const [quantidade, setQuantidade] = useState(1);
  const [imagemAtiva, setImagemAtiva] = useState(0);

  const fotos = imagensProdutos[produto.Produto] || [
    produto.Foto ? { uri: produto.Foto } : require('../assets/imagens/produto1-1.png'),
    produto.Foto2 ? { uri: produto.Foto2 } : require('../assets/imagens/produto1-2.png'),
    produto.Foto3 ? { uri: produto.Foto3 } : require('../assets/imagens/produto1-3.png'),
  ];

  const aoMudarSlide = (event) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const slide = Math.round(scrollOffset / width);
    setImagemAtiva(slide);
  };

  const incrementar = () => {
    setQuantidade((antigo) => antigo + 1);
  };

  const decrementar = () => {
    if (quantidade > 1) {
      setQuantidade((antigo) => antigo - 1);
    }
  };

  const formatarMoeda = (valor) => {
    if (!valor) return 'R$ 0,00';
    const num = parseFloat(valor.toString().replace(',', '.'));
    if (isNaN(num)) return `R$ ${valor}`;
    return `R$ ${num.toFixed(2).replace('.', ',')}`;
  };

  const precoNumerico = parseFloat(produto.Preço.toString().replace(',', '.'));
  const precoNormalNumerico = produto.ValorNormal
    ? parseFloat(produto.ValorNormal.toString().replace(',', '.'))
    : 0;
  const total = isNaN(precoNumerico) ? 0 : precoNumerico * quantidade;

  const adicionarAoCarrinho = () => {
    Alert.alert(
      'Adicionado ao Carrinho',
      `Produto: ${produto.Produto}\nQuantidade: ${quantidade}x\nTotal: ${formatarMoeda(total)}`,
      [
        {
          text: 'Continuar Comprando',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        {
          text: 'Ir para o Carrinho',
          onPress: () => {
            Alert.alert('Funcionalidade em Desenvolvimento', 'O fluxo do carrinho ainda será implementado.');
          },
        },
      ]
    );
  };

  let descontoTexto = produto.Desconto;
  if (!descontoTexto && precoNormalNumerico > 0 && precoNumerico > 0 && precoNormalNumerico > precoNumerico) {
    const perc = Math.round(((precoNormalNumerico - precoNumerico) / precoNormalNumerico) * 100);
    descontoTexto = `${perc}%`;
  }

  if (!route?.params?.produto) {
    return (
      <SafeAreaView style={estilos.container}>
        <View style={estilos.errorContainer}>
          <Text style={estilos.errorText}>Produto não encontrado.</Text>
          <TouchableOpacity style={estilos.botaoCarrinho} onPress={() => navigation.goBack()}>
            <Text style={estilos.textoBotaoCarrinho}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView contentContainerStyle={estilos.scrollContainer}>
        <View style={estilos.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={aoMudarSlide}
            scrollEventThrottle={16}
            style={estilos.carousel}
          >
            {fotos.map((foto, index) => (
              <Image key={index} source={foto} style={estilos.imagemSlide} resizeMode="cover" />
            ))}
          </ScrollView>

          <View style={estilos.paginacaoContainer}>
            {fotos.map((_, index) => (
              <View
                key={index}
                style={[estilos.dot, imagemAtiva === index ? estilos.dotAtivo : estilos.dotInativo]}
              />
            ))}
          </View>

          {descontoTexto ? (
            <View style={estilos.badgeDesconto}>
              <Text style={estilos.textoBadgeDesconto}>{descontoTexto} OFF</Text>
            </View>
          ) : null}
        </View>

        <View style={estilos.detalhesContainer}>
          <Text style={estilos.nome}>{produto.Produto}</Text>
          {produto.Descrição ? (
            <Text style={estilos.descricao}>{produto.Descrição}</Text>
          ) : (
            <Text style={[estilos.descricao, estilos.semDescricao]}>
              Nenhuma descrição disponível para este produto.
            </Text>
          )}

          <View style={estilos.blocoPreco}>
            {produto.ValorNormal ? (
              <Text style={estilos.precoNormal}>{formatarMoeda(produto.ValorNormal)}</Text>
            ) : null}
            <View style={estilos.linhaPrecoVenda}>
              <Text style={estilos.precoVenda}>{formatarMoeda(produto.Preço)}</Text>
              {produto.ValorDesconto ? (
                <Text style={estilos.economizeBadge}>
                  Economize {formatarMoeda(produto.ValorDesconto)}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={estilos.divisor} />

          <View style={estilos.secaoQuantidade}>
            <View>
              <Text style={estilos.tituloQuantidade}>Quantidade</Text>
              <Text style={estilos.subtituloQuantidade}>Selecione quantas unidades deseja</Text>
            </View>
            <View style={estilos.contadorContainer}>
              <TouchableOpacity
                style={[estilos.botaoContador, quantidade === 1 && estilos.botaoContadorDesativado]}
                onPress={decrementar}
                disabled={quantidade === 1}
              >
                <Text style={estilos.textoBotaoContador}>-</Text>
              </TouchableOpacity>
              <Text style={estilos.quantidadeTexto}>{quantidade}</Text>
              <TouchableOpacity style={estilos.botaoContador} onPress={incrementar}>
                <Text style={estilos.textoBotaoContador}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={estilos.divisor} />

          <View style={estilos.footer}>
            <View style={estilos.blocoTotal}>
              <Text style={estilos.tituloTotal}>Subtotal</Text>
              <Text style={estilos.valorTotal}>{formatarMoeda(total)}</Text>
            </View>
            <TouchableOpacity style={estilos.botaoCarrinho} onPress={adicionarAoCarrinho}>
              <Text style={estilos.textoBotaoCarrinho}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf5fb',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fdf5fb',
  },
  carouselContainer: {
    position: 'relative',
    height: 320,
    backgroundColor: '#f5e2f0',
  },
  carousel: {
    width: width,
    height: 320,
  },
  imagemSlide: {
    width: width,
    height: 320,
  },
  paginacaoContainer: {
    position: 'absolute',
    bottom: 18,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotAtivo: {
    backgroundColor: '#c24693',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotInativo: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  badgeDesconto: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 10,
    backgroundColor: '#bb2e6f',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  textoBadgeDesconto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  detalhesContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 40,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  nome: {
    fontSize: 24,
    fontWeight: '800',
    color: '#311a2f',
    marginBottom: 10,
    lineHeight: 30,
  },
  descricao: {
    fontSize: 15,
    color: '#67536c',
    lineHeight: 22,
    marginBottom: 24,
  },
  semDescricao: {
    color: '#a68ca6',
    fontStyle: 'italic',
  },
  blocoPreco: {
    backgroundColor: '#f9edf6',
    padding: 18,
    borderRadius: 18,
    marginBottom: 22,
  },
  precoNormal: {
    fontSize: 14,
    color: '#9c7a92',
    textDecorationLine: 'line-through',
    marginBottom: 8,
  },
  linhaPrecoVenda: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  precoVenda: {
    fontSize: 28,
    fontWeight: '800',
    color: '#311a2f',
    marginRight: 10,
  },
  economizeBadge: {
    fontSize: 12,
    color: '#4c8e5a',
    fontWeight: '700',
    backgroundColor: '#eaf7ef',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  divisor: {
    height: 1,
    backgroundColor: '#f1e3ec',
    marginVertical: 20,
  },
  secaoQuantidade: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tituloQuantidade: {
    fontSize: 16,
    fontWeight: '700',
    color: '#311a2f',
  },
  subtituloQuantidade: {
    fontSize: 12,
    color: '#8a6d83',
    marginTop: 4,
  },
  contadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3fb',
    borderRadius: 32,
    padding: 4,
    borderWidth: 1,
    borderColor: '#f2d7e6',
  },
  botaoContador: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  botaoContadorDesativado: {
    backgroundColor: '#f3e2ed',
  },
  textoBotaoContador: {
    fontSize: 20,
    fontWeight: '700',
    color: '#311a2f',
  },
  quantidadeTexto: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    color: '#311a2f',
    minWidth: 44,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },
  blocoTotal: {
    flex: 1,
  },
  tituloTotal: {
    fontSize: 12,
    color: '#8a6d83',
    fontWeight: '700',
  },
  valorTotal: {
    fontSize: 28,
    fontWeight: '800',
    color: '#c24693',
    marginTop: 6,
  },
  botaoCarrinho: {
    backgroundColor: '#c24693',
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c24693',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 4,
  },
  textoBotaoCarrinho: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fdf5fb',
  },
  errorText: {
    fontSize: 18,
    color: '#5f3a5a',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
});