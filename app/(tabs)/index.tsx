import React, { useState } from 'react';
import {Modal} from 'react-native';
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
interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

interface Customization {
  id: string;
  title: string;
  type: 'radio' | 'checkbox'; // 'radio' para seleção única, 'checkbox' para múltipla
  options: CustomizationOption[];
}

interface FoodItem {
  id: string;
  name: string;
  image: any;
  description: string;
  price: number;
  customizations?: Customization[]; // Campo opcional
}

interface CartItem extends FoodItem {
  quantity: number;
  selectedCustomizations?: CustomizationOption[]; // Para guardar as opções escolhidas
}

// Dados
const foodMenu: FoodItem[] = [
  {
    id: 'food1', name: 'X-Burguer', image: require('../../assets/images/xburguer.png'), description: 'Pão, carne e queijo', price: 15.99,
    customizations: [
      {
        id: 'cust1', title: 'Adicionais', type: 'checkbox',
        options: [
          { id: 'opt1', name: 'Bacon', price: 3.00 },
          { id: 'opt2', name: 'Ovo', price: 2.00 },
          { id: 'opt3', name: 'Salada', price: 1.50 },
        ],
      },
      {
        id: 'cust2', title: 'Ponto da Carne', type: 'radio',
        options: [
          { id: 'opt4', name: 'Mal passado', price: 0 },
          { id: 'opt5', name: 'Ao ponto', price: 0 },
          { id: 'opt6', name: 'Bem passado', price: 0 },
        ],
      },
    ]
  },
  {
    id: 'food2', name: 'X-Bacon', image: require('../../assets/images/xbacon.png'), description: 'Pão, carne, queijo, bacon crocante, alface, tomate, e molho especial.', price: 18.00,
    customizations: [
      {
        id: 'cust3', title: 'Adicionais', type: 'checkbox',
        options: [
          { id: 'opt7', name: 'Ovo', price: 2.00 },
          { id: 'opt8', name: 'Carne extra', price: 5.00 },
        ],
      },
      {
        id: 'cust4', title: 'Remover', type: 'checkbox',
        options: [
          { id: 'opt9', name: 'Sem alface', price: 0 },
          { id: 'opt10', name: 'Sem tomate', price: 0 },
        ],
      }
    ]
  },
  { id: 'food3', name: 'Batata Frita', image: require('../../assets/images/batataFrita.png'), description: 'Porção de batatas fritas crocantes', price: 10.99 },
  {
    id: 'food4', name: 'Hot-Dog', image: require('../../assets/images/hotdog.png'), description: 'Pão, salsicha, e condimentos.', price: 10.00,
    customizations: [
      {
        id: 'cust5', title: 'Turbine seu Hot-Dog', type: 'checkbox',
        options: [
          { id: 'opt11', name: 'Salsicha extra', price: 3.00 },
          { id: 'opt12', name: 'Bacon', price: 3.00 },
          { id: 'opt13', name: 'Queijo ralado', price: 1.50 },
        ],
      }
    ]
  },
  {
    id: 'food5', name: 'X-Tudo', image: require('../../assets/images/x-tudo.png'), description: 'Pão, carne, queijo, bacon, ovo frito, alface, tomate, milho...', price: 25.00,
    customizations: [
      {
        id: 'cust6', title: 'Deseja remover algo?', type: 'checkbox',
        options: [
          { id: 'opt14', name: 'Sem milho', price: 0 },
          { id: 'opt15', name: 'Sem batata palha', price: 0 },
          { id: 'opt16', name: 'Sem alface/tomate', price: 0 },
        ],
      }
    ]
  },
  {
    id: 'food6', name: 'Crepe Salgado', image: require('../../assets/images/crepesalgado.png'), description: 'Massa fina e crocante com recheio.', price: 15.00,
    customizations: [
      {
        id: 'cust7', title: 'Escolha o Recheio', type: 'radio',
        options: [
          { id: 'opt17', name: 'Frango com Catupiry', price: 0 },
          { id: 'opt18', name: 'Presunto e Queijo', price: 0 },
          { id: 'opt19', name: 'Carne Seca', price: 2.00 },
        ],
      }
    ]
  },
  {
    id: 'food7', name: 'Crepe Doce', image: require('../../assets/images/crepedoce.png'), description: 'Massa leve e dourada com recheio.', price: 15.00,
    customizations: [
       {
        id: 'cust8', title: 'Escolha o Recheio', type: 'radio',
        options: [
          { id: 'opt20', name: 'Nutella com Morango', price: 2.00 },
          { id: 'opt21', name: 'Doce de Leite com Banana', price: 0 },
          { id: 'opt22', name: 'Chocolate Branco com Oreo', price: 1.50 },
        ],
      }
    ]
  },
];

const drinkMenu: FoodItem[] = [
  { id: 'drink1', name: 'Refrigerante', image: require('../../assets/images/cocacola.png'), description: 'Refrigerante Coca Cola', price: 5.99 },
  { id: 'drink2', name: 'Suco de Laranja', image: require('../../assets/images/laranja.png'), description: 'Suco natural de frutas', price: 6.99 },
  {
    id: 'drink3', name: 'Açai (500ml)', image: require('../../assets/images/açai.png'), description: 'Açaí cremoso batido com guaraná.', price: 20.00,
    customizations: [
       {
        id: 'cust9', title: 'Toppings (escolha até 3)', type: 'checkbox', // Aqui você pode adicionar uma lógica extra para limitar a 3 opções
        options: [
          { id: 'opt23', name: 'Banana', price: 0 },
          { id: 'opt24', name: 'Morango', price: 1.50 },
          { id: 'opt25', name: 'Leite Condensado', price: 1.00 },
          { id: 'opt26', name: 'Granola', price: 0 },
          { id: 'opt27', name: 'Leite em Pó', price: 1.00 },
        ],
      }
    ]
  },
  { id: 'drink4', name: 'Milkshake de Oreo', image: require('../../assets/images/milkshake.png'), description: 'Delicioso milkshake cremoso.', price: 18.00 },
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

// Novos estados para o modal de personalização
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [currentCustomizations, setCurrentCustomizations] = useState<CustomizationOption[]>([]);



const handleAddToCart = (item: FoodItem) => {
    // Se o item tem customizações, abre o modal
    if (item.customizations && item.customizations.length > 0) {
      setSelectedItem(item);
      setCurrentCustomizations([]); // Limpa as seleções anteriores
      setModalVisible(true);
    } else {
      // Se não, adiciona direto no carrinho sem customizações
      addToCart(item, 1, []);
    }
  };

  const addToCart = (
    item: FoodItem,
    quantity = 1,
    selectedCustomizations: CustomizationOption[]
  ) => {
    setCart((prevCart) => {
      const newItem: CartItem = {
        ...item,
        quantity,
        selectedCustomizations,
        // Criamos um ID único para o item no carrinho para diferenciar
        // itens iguais com customizações diferentes (ex: dois X-Burguer)
        id: `${item.id}-${Date.now()}` 
      };
      return [...prevCart, newItem];
    });
    setModalVisible(false); // Garante que o modal feche após adicionar
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => {
    const customizationsPrice = item.selectedCustomizations?.reduce((custAcc, cust) => custAcc + cust.price, 0) ?? 0;
    return acc + (item.price + customizationsPrice) * item.quantity;
  }, 0).toFixed(2);

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

 const renderCustomizationModal = () => {
    if (!selectedItem) return null;

    const handleCustomizationSelect = (option: CustomizationOption, customization: Customization) => {
      setCurrentCustomizations(prev => {
        if (customization.type === 'radio') {
          // Remove outras opções do mesmo grupo de rádio antes de adicionar a nova
          const otherOptionsFromGroup = customization.options.map(o => o.id);
          const filtered = prev.filter(p => !otherOptionsFromGroup.includes(p.id));
          return [...filtered, option];
        } else { // checkbox
          const isSelected = prev.find(p => p.id === option.id);
          if (isSelected) {
            // Se já estiver selecionado, remove
            return prev.filter(p => p.id !== option.id);
          } else {
            // Se não, adiciona
            return [...prev, option];
          }
        }
      });
    };

    const calculateCustomizationPrice = () => {
      // Soma o preço base do item com o preço de todas as customizações selecionadas
      return currentCustomizations.reduce((acc, opt) => acc + opt.price, selectedItem.price);
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedItem.name}</Text>
            <ScrollView>
              {selectedItem.customizations?.map(cust => (
                <View key={cust.id} style={styles.customizationGroup}>
                  <Text style={styles.customizationTitle}>{cust.title}</Text>
                  {cust.options.map(opt => (
                    <TouchableOpacity
                      key={opt.id}
                      style={styles.optionButton}
                      onPress={() => handleCustomizationSelect(opt, cust)}
                    >
                      <FontAwesome
                        name={cust.type === 'radio' ? (currentCustomizations.some(p => p.id === opt.id) ? 'dot-circle-o' : 'circle-o') : (currentCustomizations.some(p => p.id === opt.id) ? 'check-square-o' : 'square-o')}
                        size={20}
                        color="#333"
                      />
                      <Text style={styles.optionText}>{opt.name}</Text>
                      {opt.price > 0 && <Text style={styles.optionPrice}>+ R$ {opt.price.toFixed(2)}</Text>}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalAddButton}
              onPress={() => addToCart(selectedItem, 1, currentCustomizations)}
            >
              <Text style={styles.modalAddButtonText}>
                Adicionar ao carrinho (R$ {calculateCustomizationPrice().toFixed(2)})
              </Text>
            </TouchableOpacity>
             <TouchableOpacity
              style={[styles.modalAddButton, {backgroundColor: '#aaa'}]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalAddButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
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
         <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
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
         <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
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
         <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
            <FontAwesome name="shopping-cart" size={16} color="white" />
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      ))}

     <Text style={styles.sectionTitle}>Carrinho</Text>
      {cart.map((item) => (
        <View key={item.id} style={styles.cartItemContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cartItem}>
              {item.name} x{item.quantity}
            </Text>
            {/* Mostra as customizações escolhidas */}
            {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
              <Text style={styles.cartCustomizations}>
                {item.selectedCustomizations.map(c => c.name).join(', ')}
              </Text>
            )}
          </View>
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
      {renderCustomizationModal()}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  customizationGroup: {
    marginBottom: 15,
  },
  customizationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  optionPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalAddButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  modalAddButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartCustomizations: {
    color: '#f0f0f0',
    fontSize: 12,
    marginLeft: 10,
    fontStyle: 'italic',
  },
});
