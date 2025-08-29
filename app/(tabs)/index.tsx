import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PaymentCard from './PaymentCard'; // Assumindo que PaymentCard está na mesma pasta

// Tipos
interface FoodItem {
  id: string;
  name: string;
  image: any;
  description: string;
  price: number;
}

interface CartItem extends FoodItem {
  quantity: number;
}

// Dados
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

const paymentMethods = [
  { label: 'Crédito', icon: 'credit-card', backText: 'Pagamento via cartão de crédito.' },
  { label: 'Débito', icon: 'money-check-alt', backText: 'Pagamento via cartão de débito.' },
  { label: 'Pix', icon: 'qrcode', backText: 'Pagamento instantâneo via Pix.' },
  { label: 'Dinheiro', icon: 'money-bill-wave', backText: 'Pagamento em espécie na entrega.' },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [screen, setScreen] = useState<'menu' | 'payment'>('menu');

  const addToCart = (item: FoodItem, quantity = 1) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const finalizarPedido = () => {
    if (!name.trim() || !contact.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha seu nome e contato.');
      setScreen('menu');
      return;
    }
    if (cart.length === 0) {
      Alert.alert('Atenção', 'Seu carrinho está vazio.');
      setScreen('menu');
      return;
    }
    if (!selectedPayment) {
      Alert.alert('Atenção', 'Selecione uma forma de pagamento.');
      setScreen('payment');
      return;
    }
    Alert.alert(
      'Pedido Finalizado',
      `Nome: ${name}\nContato: ${contact}\nPagamento: ${selectedPayment}\nTotal: R$ ${totalPrice}`
    );
    setCart([]);
    setName('');
    setContact('');
    setSelectedPayment('');
    setScreen('menu');
  };

  const renderMenu = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/images/frotellifoodLogo.png')} style={styles.logo} />

      <Text style={styles.title}>Lanchonete Online</Text>

      <Text style={styles.sectionTitle}>Informações do Cliente</Text>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Contato"
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
      />

      <Text style={styles.sectionTitle}>Combos</Text>
      {comboMenu.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.foodName}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
            <FontAwesome name="shopping-cart" size={16} color="white" />
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Hambúrgueres Separados</Text>
      {foodMenu.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.foodName}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
            <FontAwesome name="shopping-cart" size={16} color="white" />
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Bebidas</Text>
      {drinkMenu.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.foodName}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
            <FontAwesome name="shopping-cart" size={16} color="white" />
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Carrinho</Text>
      {cart.map((item) => (
        <View key={item.id} style={styles.cartItemContainer}>
          <Text style={styles.cartItem}>
            {item.name} x{item.quantity} - R$ {(item.price * item.quantity).toFixed(2)}
          </Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.total}>Total: R$ {totalPrice}</Text>

      {cart.length > 0 && (
        <TouchableOpacity style={styles.paymentButton} onPress={() => setScreen('payment')}>
          <Text style={styles.paymentButtonText}>Escolher forma de pagamento</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );

  const renderPayment = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Escolha a forma de pagamento</Text>
     <View style={styles.paymentList}>
  {paymentMethods.map((method) => (
    <View key={method.label} style={{ marginBottom: 15 }}>
      <PaymentCard
        label={method.label}
        icon={method.icon}
        backText={method.backText}
        selected={selectedPayment === method.label}
        onSelect={() => setSelectedPayment(method.label)}
      />
    </View>
  ))}
</View>


      <TouchableOpacity style={styles.button} onPress={finalizarPedido}>
        <Text style={styles.buttonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: 10, backgroundColor: '#aaa' }]} onPress={() => setScreen('menu')}>
        <Text style={styles.buttonText}>Voltar ao Cardápio</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return screen === 'menu' ? renderMenu() : renderPayment();
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#890086',
    flexGrow: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
    borderRadius: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: 'yellow', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, color: 'yellow' },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 10,
    marginVertical: 5,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
  borderRadius: 12,
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginVertical: 8,
  width: '75%',
  alignItems: 'center',
  },
  image: { width: 90, height: 70, borderRadius: 80, marginBottom: 8 },
  foodName: { fontWeight: 'bold', fontSize: 16 },
  price: { color: 'green', fontWeight: 'bold' },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    alignItems: 'center',
  },
  addButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 5 },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 5,
  },
  cartItem: { color: 'yellow', fontSize: 14, },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 9,
    alignItems: 'center',
  },
  removeButtonText: { color: 'white', fontWeight: 'bold' },
  total: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    color: 'white',
  },
  paymentButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardRow: {
    flexDirection: 'column',
    marginBottom: 70,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  paymentList: {
  width: '100%',
  alignItems: 'center',
  marginBottom: 30,
},
});
