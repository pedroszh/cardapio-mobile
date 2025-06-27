import { useState } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface FoodItem {
  id: string;
  name: string;
  image: any;
  description: string;
  price: number;
}

export default function HomeScreen() {
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const foodMenu: FoodItem[] = [
    { id: 'food1', name: 'X-Burguer', image: require('../../assets/images/xburguer.png'), description: 'Pão, carne e queijo', price: 15.99 },
    { id: 'food2', name: 'X-Bacon', image: require('../../assets/images/xbacon.png'), description: 'Pão, carne, queijo, bacon crocante, alface, tomate, e molho especial.', price: 18.00 },
    { id: 'food3', name: 'Batata Frita', image: require('../../assets/images/batataFrita.png'), description: 'Porção de batatas fritas crocantes', price: 10.99 },
    { id: 'food4', name: 'Hot-Dog', image: require('../../assets/images/hotdog.png'), description: 'Pão de cachorro-quente, salsicha, ketchup, mostarda, maionese, milho, batata palha e outros condimentos a gosto.', price: 10.00 },
    { id: 'food5', name: 'X-Tudo', image: require('../../assets/images/x-tudo.png'), description: 'Pão, carne, queijo, bacon, ovo frito, alface, tomate, milho, batata palha, ketchup, maionese e molho especial.', price: 25.00 },
    { id: 'food6', name: 'Crepe Salgado', image: require('../../assets/images/crepesalgado.png'), description: 'Massa fina e crocante recheada com opções como frango com catupiry, presunto e queijo, carne seca com queijo coalho, ou vegetariano com palmito e tomate seco.', price: 15.00 },
    { id: 'food7', name: 'Crepe Doce', image: require('../../assets/images/crepedoce.png'), description: 'Massa leve e dourada recheada com opções como Nutella com morango, doce de leite com banana, chocolate branco com Oreo ou Romeu e Julieta (goiabada com queijo).', price: 15.00 },
  ];

  const drinkMenu: FoodItem[] = [
    { id: 'drink1', name: 'Refrigerante', image: require('../../assets/images/cocacola.png'), description: 'Refrigerante Coca Cola', price: 5.99 },
    { id: 'drink2', name: 'Suco de Laranja', image: require('../../assets/images/laranja.png'), description: 'Suco natural de frutas', price: 6.99 },
    { id: 'drink3', name: 'Açai (500ml)', image: require('../../assets/images/açai.png'), description: 'Açaí cremoso batido com guaraná, servido em copo e acompanhado de toppings como banana, morango, leite condensado, granola e paçoca. Opção de adicionar leite em pó, amendoim ou chocolate.', price: 20.00 },
    { id: 'drink4', name: 'Milkshake de Oreo', image: require('../../assets/images/milkshake.png'), description: 'Delicioso milkshake cremoso feito com sorvete de baunilha, pedaços de biscoito Oreo e cobertura de chocolate, finalizado com chantilly.', price: 18.00 },
  ];

  const comboMenu: FoodItem[] = [
    { id: 'combo1', name: 'Combo X-Burguer', image: require('../../assets/images/trioXburguer.png'), description: 'X-Burguer + Batata Frita + Coca-Cola', price: 25.99 },
    { id: 'combo2', name: 'Combo X-Bacon', image: require('../../assets/images/triobacon.png'), description: 'X-Bacon + Batata Frita + Coca-Cola', price: 28.99 },
    { id: 'combo3', name: 'Combo X-Tudo', image: require('../../assets/images/triotudo.png'), description: 'X-Tudo + Batata Frita + Coca-Cola', price: 32.99 },
  ];

  const addToCart = (item: FoodItem) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((cartItem) => cartItem.id === item.id);
      if (!itemExists) {
        return [...prevCart, item];
      }
      return prevCart;
    });
  };
  

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      }
      return prevCart;
    });
  };
  
  const clearCart = () => {
    setCart([]);
  };
  

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/images/frotellifoodLogo.png')} style={styles.logo} />

      <Text style={styles.title}>Lanchonete Online</Text>

      <Text style={styles.sectionTitle}>Cadastro</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Nome" 
          style={styles.input} 
          value={name} 
          onChangeText={setName} 
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Contato" 
          style={styles.input} 
          value={contact} 
          onChangeText={setContact} 
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Cadastrar</Text>
      </TouchableOpacity>

    {/* cardápio de Hambúrguer */}
      <Text style={styles.sectionTitle}>Cardápio de Hambúguer</Text>
      <View style={styles.menuContainer}>
        {foodMenu.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.foodName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <FontAwesome name="shopping-cart" size={16} color="white" style={styles.cartIcon} />
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

        {/* cardápio de bebidas */}
      <Text style={styles.sectionTitle}>Cardápio de Bebidas</Text>
      <View style={styles.menuContainer}>
        {drinkMenu.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.foodName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <FontAwesome name="shopping-cart" size={16} color="white" style={styles.cartIcon} />
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

        {/* cardápio de trios */}
      <Text style={styles.sectionTitle}>Trios de Hambúrguer</Text>
  <View style={styles.menuContainer}>
  {comboMenu.map((item) => (
    <View key={item.id} style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.foodName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
        <FontAwesome name="shopping-cart" size={16} color="white" style={styles.cartIcon} />
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  ))}
</View>

      <Text style={styles.sectionTitle}>Resumo da Compra</Text>
      {cart.map((item) => (
        <View key={item.id} style={styles.cartItemContainer}>
          <Text style={styles.cartItem}>{item.name} - R$ {item.price.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text style={styles.total}>Total: R$ {totalPrice}</Text>

      {cart.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearButtonText}>Limpar Carrinho</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#890086' 
  },
  logo: { 
    width: 150, 
    height: 150, 
    alignSelf: 'center', 
    marginBottom: 20, // Aumenta a distância da logo para o título
    borderRadius: 90 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'white' 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 20, 
    color: 'white' 
  },
  inputContainer: { 
    width: '100%', 
    backgroundColor: '#fff', 
    borderRadius: 10,
    paddingHorizontal: 10, 
    marginBottom: 10,
    elevation: 3 
  },
  input: { 
    height: 50, 
    fontSize: 16, 
    color: '#333', 
    borderWidth: 0, 
    outlineColor: 'transparent' 
  },
  submitButton: { 
    backgroundColor: '#D9A659', 
    paddingVertical: 12, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
  submitButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  menuContainer: { 
    alignItems: 'center', 
    marginTop: 20, // Aumenta a distância entre as seções
  },
  card: { 
    padding: 8, 
    borderWidth: 1, 
    marginVertical: 5, 
    borderRadius: 12, 
    backgroundColor: 'white', 
    width: '80%', 
    alignItems: 'center',
    marginBottom: 10, // Aumenta o espaço entre os cards
  },
  image: { 
    width: 100, 
    height: 100, 
    borderRadius: 60, 
    marginBottom: 5 
  },
  foodName: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  price: { 
    color: 'green', 
    fontWeight: 'bold' 
  },
  cartItemContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginVertical: 5 
  },
  cartItem: { 
    color: 'white' 
  },
  removeButton: { 
    backgroundColor: 'red', 
    borderRadius: 5, 
    padding: 5 
  },
  removeButtonText: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  total: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 10, 
    color: 'white' 
  },
  clearButton: { 
    backgroundColor: 'red', 
    paddingVertical: 12, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
  clearButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  addButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#28a745', 
    padding: 10, 
    borderRadius: 5, 
    marginTop: 5 
  },
  addButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    marginLeft: 5 
  },
  cartIcon: { 
    marginRight: 5 
  }
});
