import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { deleteToken, getToken, saveToken } from '../utils/secureStore';

export const SettingsScreen: React.FC = () => {
  const [token, setToken] = useState('');
  const [savedToken, setSavedToken] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState(false);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const t = await getToken();
    setSavedToken(t);
  };

  const handleSave = async () => {
    await saveToken(token);
    setToken('');
    loadToken();
    setShowTokenModal(false);
  };

  const handleDelete = async () => {
    await deleteToken();
    loadToken();
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.headerTitle}>Settings</Text>

      <View style={styles.section}>
        <TouchableOpacity style={styles.row} onPress={() => setShowTokenModal(true)}>
          <Text style={styles.rowText}>API Token</Text>
          <Text style={styles.chevron}>&gt;</Text>
        </TouchableOpacity>
      </View>

      <Portal>
        <Dialog visible={showTokenModal} onDismiss={() => setShowTokenModal(false)} style={styles.dialog}>
          <Dialog.Title>API Token</Dialog.Title>
          <Dialog.Content>
            <Text variant="titleMedium" style={styles.label}>
              Current Token: {savedToken ? 'Saved' : 'None'}
            </Text>

            <TextInput
              label="API Token (Dummy)"
              value={token}
              onChangeText={setToken}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <View style={styles.actionRow}>
              <Button mode="outlined" onPress={handleDelete} textColor="red" style={styles.button}>
                Clear
              </Button>
              <Button mode="contained" onPress={handleSave} style={styles.button}>
                Save
              </Button>
            </View>
            <Button onPress={() => setShowTokenModal(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    padding: 16,
  },
  headerTitle: {
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  rowText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  chevron: {
    fontSize: 16,
    color: '#c7c7cc',
  },
  dialog: {
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 16,
    color: '#333',
  },
  input: {
    marginBottom: 16,
  },
  dialogActions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 8,
  },
  button: {
    marginLeft: 8,
  },
});
